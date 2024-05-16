import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{
  recipeSelected: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router
  ){}

  onAddToShoppingList()
  {
    this.recipeService.addIngredientsToShoppingList(this.recipeSelected.ingredients)
  }

  ngOnInit()
  {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"];
      this.recipeSelected =this.recipeService.getRecipe(this.id);
    })
  }

  onEditRecipe()
  {
    this.router.navigate(["edit"], {relativeTo: this.route}) // relative route >>> localhost: 4200/1/edit
    // this.router.navigate(["../", this.id, "edit"], {relativeTo: this.route}) // the same

  }
}
