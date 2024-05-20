import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService
{
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient("Apple", 5),
        new Ingredient("Tomato", 10),
    ]

    addIngredient(ingredient: Ingredient)
    {
        this.ingredients.push(ingredient)
    }

    getIngredients()
    {
        return this.ingredients;
    }

    getIngredient(index: number)
    {
        return this.ingredients[index];
    }

    addIngredients(ingredients: Ingredient[])
    {
        this.ingredients.push(...ingredients);
    }

    updateIngredient(index: number, newIngredient: Ingredient)
    {
        this.ingredients[index] = {...newIngredient}
        // this.ingredients[index] = newIngredient
    }

    deleteIngredient(index: number)
    {
        return this.ingredients.splice(index, 1);
    }
}