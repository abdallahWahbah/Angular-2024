import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { Recipe } from "./recipe.model";
import { DataStorageService } from "../services/data-storage.service";
import { RecipeService } from "../services/recipe.service";

// we made this resolver because if yu chose a recipe and refreshed the page, you will get an error
// we also added a resolve property to the app.routing.module file
// and we subscribed the getAllRecipesService() in the header 

// the resolver is a code that runs before the a route is loaded to ensure that certain data the route depends on is there

@Injectable({providedIn: "root"}) // you can remove this object and inject the service manually by adding it in the providers array in app.module.ts
export class RecipesResolverService implements Resolve<Recipe[]>
{
    constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();
        if(recipes.length === 0)
        {
            return this.dataStorageService.fetchRecipes();
        }
        else return recipes;
    }
}


// add this class to the app-routing.module.ts