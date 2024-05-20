import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  
  @ViewChild("form") form: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService){}

  ngOnInit()
  {
    this.subscription = this.shoppingListService.startedEditing.subscribe(index => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.form.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount,
      })
    })
  }
  ngOnDestroy()
  {
    this.subscription.unsubscribe()
  }

  onSubmit()
  {
    const newIngredient = new Ingredient(this.form.value.name, this.form.value.amount);
    if(this.editMode) this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient)
    else this.shoppingListService.addIngredient(newIngredient)
    this.form.reset()
    this.editMode = false;
  }
  onClear()
  {
    this.form.reset()
    this.editMode = false;
  }
  onDelete()
  {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear()
  }
}
