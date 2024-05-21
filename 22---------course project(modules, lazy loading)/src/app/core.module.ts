import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ShoppingListService } from "./services/shopping-list.service";
import { RecipeService } from "./services/recipe.service";
import { AuthInterceptor } from "./auth/auth-interceptor.service";

@NgModule({
    providers: [
      ShoppingListService, 
      RecipeService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
})
export class CoreModule
{

}