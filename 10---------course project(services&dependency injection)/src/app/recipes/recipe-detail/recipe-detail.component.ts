import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {
  @Input() recipeSelected: Recipe;

  constructor(private recipeService: RecipeService){}

  onAddToShoppingList()
  {
    this.recipeService.addIngredientsToShoppingList(this.recipeSelected.ingredients)
  }
}
