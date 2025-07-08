import { Component } from '@angular/core';

import { AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { IngredientsService } from "../../services/ingredients.service";
import { Ingredient } from "../../model/ingredient.entity";
import { IngredientCreateAndEditComponent } from "../../components/ingredient-create-and-edit/ingredient-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-ingredient-management',
  imports: [MatPaginator, MatSort, MatIconModule, IngredientCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './ingredient-management.component.html',
  styleUrl: './ingredient-management.component.css'
})
export class IngredientManagementComponent implements OnInit, AfterViewInit  {

  // Attributes
  ingredientData: Ingredient;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id', 'name', 'category', 'calories', 'carbs',
    'proteins', 'fats', 'allergies', 'recipes', 'actions'
  ];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

// Constructor
  constructor(private ingredientService: IngredientsService) {
    this.isEditMode = false;
    this.ingredientData = {} as Ingredient;
    this.dataSource = new MatTableDataSource<any>();
  }

// Private Methods
  private resetEditState(): void {
    this.isEditMode = false;
    this.ingredientData = {} as Ingredient;
  }

// CRUD Actions

  private getAllIngredients(): void {
    this.ingredientService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  };
  /////////////////

  private createIngredient(): void {
    this.ingredientService.create(this.ingredientData)
      .subscribe((response: any) => {
        this.dataSource.data.push({ ...response });
        this.dataSource.data = this.dataSource.data
          .map((ingredient: Ingredient) => {
            return ingredient;
          }); // Trigger Angular change detection
      });
  };


  private updateIngredient(): void {
    let ingredientToUpdate: Ingredient = this.ingredientData;
    this.ingredientService.update(this.ingredientData.id, ingredientToUpdate)
      .subscribe((response: any) => {
        this.dataSource.data = this.dataSource.data.map((ingredient: Ingredient) => {
          if (ingredient.id === response.id) {
            return response;
          }
          return ingredient;
        });
      });
  };


  private deleteIngredient(ingredientId: number): void {
    this.ingredientService.delete(ingredientId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((ingredient: Ingredient) => {
          return ingredient.id !== ingredientId ? ingredient : false;
        });
      });
  };

   // UI Event Handlers

  onEditItem(arg: Ingredient | Event): void {
    const element = arg as Ingredient;
    this.isEditMode = true;
    this.ingredientData = element;
  }

  onDeleteItem(element: Ingredient) {
    this.deleteIngredient(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllIngredients();
  }

  onIngredientAdded(element: Ingredient) {
    this.ingredientData = element;
    this.createIngredient();
    this.resetEditState();
  }

  onIngredientUpdated(element: Ingredient) {
    this.ingredientData = element;
    this.updateIngredient();
    this.resetEditState();
  }

// Lifecycle Hooks

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllIngredients();
  }

}
