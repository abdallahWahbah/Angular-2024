import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesResolverService } from "./recipes-resolver.service";

const recipesRoutes: Routes = [
    // {path: "recipes",  // we used lazy loading, so we need to empty the path and add loadChildren in app.routing.module.ts
    {path: "", 
        component: RecipesComponent, 
        canActivate: [AuthGuard],
        children: [
            {path: "", component: RecipeStartComponent},
            {path: "new", component: RecipeEditComponent},
            {path: ":id", component: RecipeDetailComponent, resolve: [RecipesResolverService]},
            {path: ":id/edit", component: RecipeEditComponent, resolve: [RecipesResolverService]},
        ]
    },
]

@NgModule({
    imports: [
        RouterModule.forChild(recipesRoutes)
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule
{

}