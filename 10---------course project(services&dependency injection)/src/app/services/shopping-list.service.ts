import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService
{
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

    addIngredients(ingredients: Ingredient[])
    {
        this.ingredients.push(...ingredients);
    }
}