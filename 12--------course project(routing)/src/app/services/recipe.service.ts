import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";

@Injectable()
export class RecipeService
{
    selectedRecipe = new EventEmitter<Recipe>();

    constructor(private shoppingListService: ShoppingListService){}

    private recipes: Recipe[] = [
        new Recipe('Tasty Schnitzel', 
        'A super tasty schnitzel - just awesome!', 
        'https://cdn.loveandlemons.com/wp-content/uploads/2021/11/smashed-potatoes-1.jpg',
        [new Ingredient("Meat", 1), new Ingredient("French Fries", 20)]
        ),
        new Recipe('Big Fat Burger', 
        'What else you need to say?', 
        'https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg',
        [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
        )
    ];
    
    getRecipes()
    {
        return this.recipes.slice();
    }

    getRecipe(id: number)
    {
        return this.recipes[id]
    }

    addIngredientsToShoppingList(ingredients: Ingredient[])
    {
        this.shoppingListService.addIngredients(ingredients)
    }
}