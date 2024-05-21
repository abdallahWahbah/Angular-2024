import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy{

  recipes: Recipe[]
  recipeSubscription: Subscription;
  
  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.recipeSubscription = this.recipeService.recipesChanged.subscribe((response: any) =>{
      this.recipes = response;
    })

    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe()
  {
    this.router.navigate(["new"], {relativeTo: this.route}) // relative route >>> localhost:4200/recipes/new
  }

  ngOnDestroy()
  {
    this.recipeSubscription.unsubscribe();
  }
}
