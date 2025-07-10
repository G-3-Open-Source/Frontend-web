import { Component } from '@angular/core';
import { EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Recipe } from "../../model/recipe.entity";
import { FormsModule, NgForm } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-recipe-create-and-edit',
  imports: [MatFormField, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './recipe-create-and-edit.component.html',
  styleUrl: './recipe-create-and-edit.component.css'
})
export class RecipeCreateAndEditComponent {
  @Input() recipe: Recipe;
  @Input() editMode: boolean = false;
  @Output() recipeAdded: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  @Output() recipeUpdated: EventEmitter<Recipe> = new EventEmitter<Recipe>();
  @Output() editCanceled: EventEmitter<any> = new EventEmitter();
  @ViewChild('recipeForm', { static: false }) recipeForm!: NgForm;

  constructor() {
    this.recipe = {} as Recipe;
  }

  private resetEditState(): void {
    this.recipe = {} as Recipe;
    this.editMode = false;
    this.recipeForm.resetForm();
  }

  onSubmit(): void {
    if (this.recipeForm.form.valid) {
      const emitter: EventEmitter<Recipe> = this.editMode ? this.recipeUpdated : this.recipeAdded;
      emitter.emit(this.recipe);
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
