import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  
  @ViewChild("nameInput", {static: true}) name: ElementRef;
  @ViewChild("amountInput", {static: true}) amount: ElementRef;
  @Output() addingIngredient = new EventEmitter<Ingredient>()

  addShoppingList()
  {
    const newIngredient = new Ingredient(this.name.nativeElement.value, this.amount.nativeElement.value)
    this.addingIngredient.emit(newIngredient)
  }
}
