import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "./recipe.service";
import { map, tap } from "rxjs";

@Injectable({
    providedIn: "root" // you can remove this object and inject the service manually by adding it in the providers array in app.module.ts
})
export class DataStorageService
{
    // don't forget to add HttpClientModule to imports array in app.module.ts
    constructor(private http: HttpClient,
                private recipeService: RecipeService
    ){}

    storeRecipes()
    {
        const recipes = this.recipeService.getRecipes();
        // "put" instead of "post" to override all data in the database
        this.http.put("https://angular-2024-test-default-rtdb.firebaseio.com/recipes.json", recipes)
        .subscribe(response => console.log(response))
    }

    fetchRecipes()
    {
        return this.http.get("https://angular-2024-test-default-rtdb.firebaseio.com/recipes.json")
        .pipe(
            map((recipes: Recipe[]) =>{ // map here is an rxjs operator
                return recipes.map(recipe => { // map here is an array method
                    return {...recipe, ingredients: recipe.ingredients || []}
                })
            }),
            tap(recipes => // works as subscribe
            {
                this.recipeService.setRecipes(recipes)
            })
        )
    }
}