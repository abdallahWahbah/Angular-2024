import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  
  @Output() recipeSelection = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe 1', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('A Test Recipe 2', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];

  onRecipeSelection(recipeItem: Recipe)
  {
    this.recipeSelection.emit(recipeItem);
  }
}
