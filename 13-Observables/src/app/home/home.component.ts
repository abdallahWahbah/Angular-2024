import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, filter, interval, map } from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private intervalSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // this.intervalSubscription = interval(1000).subscribe(value => console.log(value))

    // we will build the same observable above but in a customed way (very very rarely when you build your own observable)
    let customIntervalObservable = Observable.create((observer) =>
    {
      let count = 0;
      setInterval(() =>
      {
        observer.next(count);
        if(count === 2) observer.complete();
        if(count > 3) observer.error(new Error("Counter  is greater than 3"))
        count++;
      }, 1000)
    })

    // (change the data) every observable has a pipe method
    customIntervalObservable = customIntervalObservable.pipe(
      filter((data: number) =>{ return data > 0}), 
      map((data: number) => "Round: " + data)
    )

    this.intervalSubscription = customIntervalObservable.subscribe( // (listen to changes) subscribe takes 3 anon functions (1st is not optional)
      count => console.log(count), // react to changes
      error => alert(error.message), // react to error
      () => {console.log("Completed")} // react to complete
    )
  }

  ngOnDestroy()
  {
    this.intervalSubscription.unsubscribe()
  }

}
