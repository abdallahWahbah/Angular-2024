import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild
{
    constructor(private authService: AuthService,
                private router: Router
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.authService.isAuthenticated().then(authenticated => {
            if(authenticated) return true;
            else this.router.navigate(["/"])
        })
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
        return this.canActivate(childRoute, state);
    }
}