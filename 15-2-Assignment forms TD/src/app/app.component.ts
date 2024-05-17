import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("signupForm", {static: false}) ourForm: NgForm;
  defaultSubscription="Advanced";
  answer = '';

  onSubmit()
  {
    console.log(this.ourForm.value);
  }
}
