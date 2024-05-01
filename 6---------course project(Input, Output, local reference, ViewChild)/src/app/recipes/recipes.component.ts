import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  recipeSelected: Recipe;

  // setRecipe(recipe: Recipe)
  // {
  //   this.recipeSelected = recipe
  // }
}
