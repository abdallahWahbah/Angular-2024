import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  imports: [NgFor],
})
export class SignalComponent {
  
  // actions: string[] = [];
  actions = signal<string[]>([])
  counter = signal(0);
  doubleCounter = computed(() => this.counter() * 2); 

  constructor()
  {
    effect(() => console.log(this.counter())) // run some code whenever a signal changes
  }


  increment() {
    this.counter.update(oldValue => oldValue + 1);
    // this.counter.set(5);
    // this.counter.set(this.counter() + 1); // works now like the update method

    // this.actions.push('INCREMENT'); // normal variable without signals
    this.actions.update((oldArray) => [...oldArray, 'INCREMENT']);
  }

  decrement() {
    this.counter.update(oldValue => oldValue - 1);

    // this.actions.push('DECREMENT');
    this.actions.update((oldArray) => [...oldArray, 'DECREMENT']);

  }
}
