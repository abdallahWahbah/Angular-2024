import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("form") signupForm: NgForm;
  defaultQuestion="pet";
  answer = '';
  genders=["Male", "Female"];
  user = {
    username: "",
    email: "",
    secretQuestion: "",
    answer: "",
    gender:""
  }
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ""
    //   },
    //   secret: "teacher",
    //   questionAnswer: "",
    //   gender: "Male"
    // })

    // the method above must override all controls
    // the method below will overrid certain control (you choose)
    this.signupForm.form.patchValue({
      userData: {
        username: "Abdallah"
      }})
  }

  // onSubmit(form: NgForm)
  // {
  //   console.log(form) // form.value
  // }

  // to get the form value using ViewChild without passing the reference in the html code to the onSubmit function(the same as above)
  onSubmit()
  {
    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.signupForm.reset();
  }
}
