import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, map } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  errorSubscription: Subscription;

  constructor(private http: HttpClient,
              private postsService: PostsService
  ){}

  ngOnInit() {

    this.errorSubscription = this.postsService.error.subscribe(error => 
      {
        this.error = error;
      }
    )

    this.isFetching = true;
    // subscribe takes 2 arguments, first is the response(succeed), second is error
    this.postsService.fetchPostsService().subscribe(
      responseData => {
      this.loadedPosts = responseData;
      this.isFetching = false;
      },
      error =>
      {
        this.isFetching = false;
        this.error = error.error.error;
      }
    )
  }

  onCreatePost(postData: Post) {
    this.postsService.createAndStorePostService(postData.content, postData.title)
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postsService.fetchPostsService().subscribe(
      responseData => {
      this.loadedPosts = responseData;
      this.isFetching = false;
      },
      error =>
      {
        this.isFetching = false;
        this.error = error.error.error;
      }
    )
  }

  onClearPosts() {
    this.postsService.deletePostsService().subscribe(() => {
      this.loadedPosts = [];
    })
  }

  handleError()
  {
    this.error = null;
  }

  ngOnDestroy()
  {
    this.errorSubscription.unsubscribe();  
  }
}
