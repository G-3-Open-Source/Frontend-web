import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { Ingredient } from '../../../ingredients/model/ingredient.entity';
import { IngredientsService } from '../../../ingredients/services/ingredients.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; // 👈 Asegúrate de importar esto

@Component({
  selector: 'app-add-ingredient-to-recipe',
  standalone: true,
  templateUrl: './add-ingredient-to-recipe.component.html',
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule
  ]
})
export class AddIngredientToRecipeComponent {
  ingredients: Ingredient[] = [];
  selectedIngredientId!: number;

  constructor(
    private dialogRef: MatDialogRef<AddIngredientToRecipeComponent>,
    private ingredientService: IngredientsService,
    @Inject(MAT_DIALOG_DATA) public data: { recipeId: number }
  ) {
    this.loadIngredients();
  }

  loadIngredients(): void {
    this.ingredientService.getAllArray().subscribe((response) => {
      console.log('Ingredientes cargados:', response);
      this.ingredients = response;
    });
  }

  onAdd(): void {
    this.dialogRef.close(this.selectedIngredientId);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
