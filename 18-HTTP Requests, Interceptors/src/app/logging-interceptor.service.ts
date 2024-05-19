import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class LoggingInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        console.log("Logging Interceptor: Request is on its way")
        const modifiedRequest = req.clone({
            headers: req.headers.append("interceptor_header", "interceptor_header_value")
        })
        return next.handle(modifiedRequest);
    }
}