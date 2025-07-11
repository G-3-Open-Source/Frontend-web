import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatDialogActions, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from '../../model/recipe.entity';

@Component({
  selector: 'app-recipe-create-and-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatDialogModule
  ],
  templateUrl: './recipe-create-and-edit.component.html',
  styleUrl: './recipe-create-and-edit.component.css'
})
export class RecipeCreateAndEditComponent {
  recipe: Recipe;
  editMode: boolean;

  constructor(
    private dialogRef: MatDialogRef<RecipeCreateAndEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editMode = data.editMode;
    this.recipe = data.recipe ? { ...data.recipe } : {} as Recipe;
  }

  onSubmit(): void {
    if (
      this.recipe.name &&
      this.recipe.description &&
      this.recipe.category &&
      this.recipe.recipeType &&
      this.recipe.preparationTime &&
      this.recipe.difficulty &&
      this.recipe.userId
    ) {
      this.dialogRef.close(this.recipe);
    } else {
      console.warn('Formulario incompleto');
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
