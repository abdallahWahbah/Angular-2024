import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class AuthInterceptor implements HttpInterceptor
{
    // intercept runs its code right before the request leaves our application
    // "next"(param in the intercept fn) is an object with important method that will allow us to let the request continue its journey
    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        console.log("Auth Interceptor: Request is on its way")
        console.log("Auth Interceptor: ", req.url);
        // return next.handle(req)    
        const modifiedRequest = req.clone({
            headers: req.headers.append("interceptor_header", "interceptor_header_value")
        })
        return next.handle(modifiedRequest);
    }
}

// we use interceptors when we need to do something before making the request (all requests)
// most used to make authentication


// to use this interceptor >>>> we add it in the providers in app.module.ts