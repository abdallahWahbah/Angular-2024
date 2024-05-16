import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  
  @ViewChild("nameInput", {static: true}) name: ElementRef;
  @ViewChild("amountInput", {static: true}) amount: ElementRef;

  constructor(private shoppingListService: ShoppingListService){}

  addShoppingList()
  {
    const newIngredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value);
    this.shoppingListService.addIngredient(newIngredient)
  }
}
