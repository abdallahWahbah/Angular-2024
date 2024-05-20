import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router
  ){}
  
  onSwitchMode()
  {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm)
  {
    this.isLoading = true;
    if(this.isLoginMode)
    {
      this.authService.login(form.value.email, form.value.password)
      .subscribe(
        response => {
          this.router.navigate(["/recipes"])
          this.isLoading = false;
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
      )
    }
    else
    {
      this.authService.signup(form.value.email, form.value.password)
      .subscribe(
        response => {
          this.router.navigate(["/recipes"])
          this.isLoading = false;
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        }
        )
    }
    form.reset();
  }
}
