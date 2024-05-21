import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private authServie: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        // take(1): to take one value from the observer and unsubscribe automatically after it
        // exhaustMap: when you finish the first obervable (authService.user), start the second one witch is the http request 
        return this.authServie.user.pipe(
            take(1),
            exhaustMap(user => {
                if(!user) return next.handle(req); // when we use signin or signup, it tries to send token but where make these requests to get the token

                const modifiedRequest = req.clone({
                    params: new HttpParams().set("auth", user.token)
                })
                
                return next.handle(modifiedRequest);
            })
        )
    }
}