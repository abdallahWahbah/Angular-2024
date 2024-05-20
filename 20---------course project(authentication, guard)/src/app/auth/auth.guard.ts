import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { map, take, tap } from "rxjs";

@Injectable({providedIn: "root"})
export class AuthGuard implements CanActivate
{
    constructor(private authService: AuthService,
                private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    {
        return this.authService.user.pipe(
            take(1), // always take the last value and unsusbcribe automatically
            map(user => {
                // return !!user;
                const isAuth = !!user;
                if(isAuth) return true;
                else return this.router.createUrlTree(['/auth'])
            }),
            // tap(isAuth => { // olda approach
            //     {
            //         if(!isAuth) this.router.navigate(['/auth'])
            //     }
            // })
        )
    }
}