import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";

const appRoutes: Routes = [
    {path: "", redirectTo: "/recipes", pathMatch: "full"}, // pathMatch >>> only redirect if the full path is empty
    {path: "auth", component: AuthComponent},
    {path: "recipes", loadChildren: () => import('./recipes/recipes.module').then(x => x.RecipesModule)}, // lazy loading
    {path: "auth", loadChildren: () => import('./auth/auth.module').then(x => x.AuthModule)}, // lazy loading
    {path: "shopping-list", loadChildren: () => import('./shopping-list/shopping-list.module').then(x => x.ShoppingListModule)}, // lazy loading
]

@NgModule({
    imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
    exports:[RouterModule]
})
export class AppRoutingModule
{

}