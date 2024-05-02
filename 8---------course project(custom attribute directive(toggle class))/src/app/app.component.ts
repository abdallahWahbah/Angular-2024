import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  navigationType = "recipes";
  setNavigationType(event: string)
  {
    this.navigationType = event;
  }
}
