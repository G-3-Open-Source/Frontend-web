import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Ingredient } from '../../model/ingredient.entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredient-create-and-edit',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './ingredient-create-and-edit.component.html',
  styleUrl: './ingredient-create-and-edit.component.css'
})
export class IngredientCreateAndEditComponent {
  ingredient: Ingredient;

  constructor(
    public dialogRef: MatDialogRef<IngredientCreateAndEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ingredient: Ingredient }
  ) {
    this.ingredient = { ...data.ingredient };
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.dialogRef.close(this.ingredient);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
