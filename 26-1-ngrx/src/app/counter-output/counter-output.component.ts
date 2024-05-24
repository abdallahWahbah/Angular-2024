import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCount, selectDoubleCount } from '../store/counter.selectors';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent
{
  count$: Observable<number> // "$" is a convsension for observable (automatically updated when the store changes)
  doubleCount$: Observable<number>

  constructor(private store: Store<{counter: number}>){
    // this.count$ = store.select("counter");

    this.count$ = store.select(selectCount);
    this.doubleCount$ = store.select(selectDoubleCount)

    // this.count$.subscribe() // we can subscrive to changes of the store, but we will use aync pipe in html
  }
}
