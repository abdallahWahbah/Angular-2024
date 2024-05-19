import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject, catchError, map, throwError } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class PostsService
{
    error = new Subject<string>();

    constructor(private http: HttpClient){}

    createAndStorePostService(content: string, title: string)
    {
        const newPost: Post = {content, title}

        // angular httpClient will take the pastData object (body) and convert it to json data
        // subscribe takes 2 arguments, first is the response(succeed), second is error

        this.http.post("https://angular-2024-test-default-rtdb.firebaseio.com/posts.json", 
            newPost, 
            {
                // to get the status code and ok property and some other information
                observe: "response"
            }
        )
        .subscribe(
            responseData => console.log(responseData),
            error => this.error.next(error.error.error)
        )

        // if you don't care about the response of POST method, subscribe here
        // if you care, return the observable without subscribe and subscribe in the component you need the result in
    }
    fetchPostsService()
    {
        let multipleParams = new HttpParams();
        multipleParams = multipleParams.append("print", "pretty");
        multipleParams = multipleParams.append("name", "abdalla");

        return this.http.get("https://angular-2024-test-default-rtdb.firebaseio.com/posts.json", {
            headers: new HttpHeaders({"Custom_header_1": "Abdallah", "Custem_header_2": "Wahbah"}),
            params: multipleParams // https://ng-complete-guide-ed74b-default-rtdb.firebaseio.com/posts.json?print=pretty&name=abdalla
        })
        .pipe( // pipe allows you to transform data before the subscribe method
            map((responseData: {[key: string]: Post}) => // assigning type here is optional
            {
                const newData: Post[] = [];
                for(const key in responseData)
                {
                if(responseData.hasOwnProperty(key)) 
                    newData.push({...responseData[key], id: key})
                }
                return newData;
            }),
            catchError(errorRes=> { // ingore catch error (not used in the project)
                return throwError(errorRes)
            })
        )
    }
    deletePostsService()
    {
        return this.http.delete("https://angular-2024-test-default-rtdb.firebaseio.com/posts.json")
    }
}