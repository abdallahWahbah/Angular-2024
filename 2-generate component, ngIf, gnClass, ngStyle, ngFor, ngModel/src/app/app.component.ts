import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  // template: "<app-servers></app-servers><app-servers></app-servers>",
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // styleUrls: ['./app.component.css'],
  // inline style
  // styles: [`
  // h3{
  //   color: red
  // }`]
})
export class AppComponent {
  title = 'my-first-app';
  name="helslo"
}
