import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

interface AuthResponseData
{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean; // "?" is an optional sign for the property
}

@Injectable({providedIn: "root"})// you can remove this object and inject the service manually by adding it in the providers array in app.module.ts
export class AuthService
{
    API_KEY="AIzaSyAxCNdVVEvtE8mEaek8q1NlgaEG_f13p2o";
    // user = new Subject<User>();
    user = new BehaviorSubject<User>(null); // BehaviorSubject gives the subscribers immediate access to the previously emmited value
    // even if they haven't subscribed at the point of time the value was emmited
    // that means we can access to the currently active user even if we only subscribe after the user has been emmited
    private tokenExpirationTimer: any

    constructor(private http: HttpClient,
                private router: Router
    ){}
    
    signup(email: string, password: string)
    {
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.API_KEY,
            {
                email,
                password,
                returnSecureToken: true// required by firebase, should always be true
            }
        )
        .pipe(
            catchError(errorRes => {
                let messageError = "An unknown signup error occured";
                switch(errorRes.error.error.message)
                {
                    case "EMAIL_EXISTS":
                        messageError = "Email exists, please use another!"
                }
                return throwError(messageError)
            }),
            tap(responseData => { // tap is an operator that allows us to perform some actions without changing the response
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
        )
    }

    login(email: string, password: string)
    {
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.API_KEY,
            {
                email,
                password,
                returnSecureToken: true // required by firebase, should always be true
            }
        )
        .pipe(
            catchError(errorRes => {
                let messageError = "Unknown logging error";
                console.log(errorRes.error.error.message)
                switch(errorRes.error.error.message)
                {
                    case "INVALID_LOGIN_CREDENTIALS": 
                    {
                        messageError = "Email or password is wrong";
                        break;
                    }
                    case "EMAIL_NOT_FOUND":
                    {
                        messageError = "Email not found or the user may have been deleted";
                        break;
                    }
                    case "INVALID_PASSWORD":
                    {
                        messageError = "The password you entered is wrong";
                        break;
                    }
                    case "USER_DISABLED":
                    {
                        messageError = "The user account has been disabled by an administrator";
                        break;
                    }
                }
                return  throwError(messageError)
            }),
            tap((responseData: AuthResponseData) => { // tap is an operator that allows us to perform some actions without changing the response
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            })
        )
    }

    autoLogin()
    {
        const user = JSON.parse(localStorage.getItem("userData"));
        if(!user) return;

        const loadedUser = new User(user.email, user.id, user._token, user._tokenExpirationDate);
        if(loadedUser.token) // token is the getter method
        {
            this.user.next(loadedUser);
            const expirationDuration = new Date(user._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout()
    {
        this.user.next(null);
        this.router.navigate(["/auth"]);
        localStorage.removeItem("userData")
        if(this.tokenExpirationTimer) clearTimeout(this.tokenExpirationTimer);
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number)
    {
        this.tokenExpirationTimer = setTimeout(()=>
        {   
            this.logout();
        }, expirationDuration)
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number)
    {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const newUser = new User(email, userId, token, expirationDate);
        this.user.next(newUser);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(newUser));
    }
}