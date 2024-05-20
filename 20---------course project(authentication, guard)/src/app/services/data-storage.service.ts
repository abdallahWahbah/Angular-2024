import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "./recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({
    providedIn: "root" // you can remove this object and inject the service manually by adding it in the providers array in app.module.ts
})
export class DataStorageService
{
    // don't forget to add HttpClientModule to imports array in app.module.ts
    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService
    ){}

    storeRecipes()
    {
        const recipes = this.recipeService.getRecipes();
        // "put" instead of "post" to override all data in the database
        this.http.put("https://angular-2024-test-default-rtdb.firebaseio.com/recipes.json", recipes)
        .subscribe(response => console.log(response))
    }

    fetchRecipes()
    {
        // take(1): to take one value from the observer and unsubscribe automatically after it
        // exhaustMap: when you finish the first obervable (authService.user), start the second one witch is the http request
        // cause we can't return 2 observables
        
        // to add token manually >>>> we used interceptor instead
        // return this.authService.user.pipe(
        //     take(1),
        //     exhaustMap(user => { 
        //         return this.http.get(
        //             "https://angular-2024-test-default-rtdb.firebaseio.com/recipes.json",
        //             {
        //                 params: new HttpParams().set("auth", user.token)
        //             }
        //         )
        //     }),
        //     map((recipes: Recipe[]) =>{ // map here is an rxjs operator
        //         return recipes.map(recipe => { // map here is an array method
        //             return {...recipe, ingredients: recipe.ingredients || []}
        //         })
        //     }),
        //     tap(recipes => // works as subscribe
        //     {
        //         this.recipeService.setRecipes(recipes)
        //     })
        // )

        // now we are using interceptor to add token to the request
        return this.http.get("https://angular-2024-test-default-rtdb.firebaseio.com/recipes.json")
        .pipe(
            map((recipes: Recipe[]) =>{ // map here is an rxjs operator
                return recipes.map(recipe => { // map here is an array method
                    return {...recipe, ingredients: recipe.ingredients || []}
                })
            }),
            tap(recipes => // works as subscribe
            {
                this.recipeService.setRecipes(recipes)
            })
        )
        // return this.authService.user.pipe(
        //     take(1),
        //     exhaustMap(user => { 
        //     }),
        // )
    }
}