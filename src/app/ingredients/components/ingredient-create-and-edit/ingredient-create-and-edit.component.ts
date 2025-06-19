import { Component } from '@angular/core';

import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Ingredient } from "../../model/ingredient.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-ingredient-create-and-edit',
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './ingredient-create-and-edit.component.html',
  styleUrl: './ingredient-create-and-edit.component.css'
})
export class IngredientCreateAndEditComponent {

  // Attributes
  @Input() ingredient: Ingredient;
  @Input() editMode: boolean = false;
  @Output() ingredientAdded: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  @Output() ingredientUpdated: EventEmitter<Ingredient> = new EventEmitter<Ingredient>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('ingredientForm', {static: false}) ingredientForm!: NgForm;

  // Methods
  constructor() {
    this.ingredient = {} as Ingredient;
  }

  // Private methods
  private resetEditState(): void {
    this.ingredient = {} as Ingredient;
    this.editMode = false;
    this.ingredientForm.resetForm();
  }

  // Event Handlers

  onSubmit(): void {
    if (this.ingredientForm.form.valid) {
      let emitter: EventEmitter<Ingredient> = this.editMode ? this.ingredientUpdated : this.ingredientAdded;
      emitter.emit(this.ingredient);
      this.resetEditState();
    } else {
      console.error('Invalid data in form');
    }
  }

  onCancel(): void {
    this.editCanceled.emit();
    this.resetEditState();
  }

}
