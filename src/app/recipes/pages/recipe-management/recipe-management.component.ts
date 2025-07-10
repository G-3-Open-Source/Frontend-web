import { Component } from '@angular/core';
import { AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatIconModule } from "@angular/material/icon";
import { RecipeService } from "../../services/recipe.service";
import { Recipe } from "../../model/recipe.entity";
import { RecipeCreateAndEditComponent } from "../../components/recipe-create-and-edit/recipe-create-and-edit.component";
import { NgClass } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-recipe-management',
  imports: [MatPaginator, MatSort, MatIconModule, RecipeCreateAndEditComponent, MatTableModule, NgClass, TranslateModule],
  templateUrl: './recipe-management.component.html',
  styleUrl: './recipe-management.component.css'
})
export class RecipeManagementComponent implements OnInit, AfterViewInit {
  recipeData: Recipe;
  dataSource!: MatTableDataSource<Recipe>;
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'category',
    'recipeType',
    'preparationTime',
    'difficulty',
    'userId',
    'ingredients',
    'actions'
  ];
  isEditMode: boolean;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(private recipeService: RecipeService) {
    this.isEditMode = false;
    this.recipeData = {} as Recipe;
    this.dataSource = new MatTableDataSource<Recipe>();
  }

  private resetEditState(): void {
    this.isEditMode = false;
    this.recipeData = {} as Recipe;
  }

  private getAllRecipes(): void {
    this.recipeService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  }

  private createRecipe(): void {
    this.recipeService.create(this.recipeData)
      .subscribe((response: Recipe) => {
        this.dataSource.data.push({ ...response });
        this.dataSource.data = this.dataSource.data.map(recipe => recipe);
      });
  }

  private updateRecipe(): void {
    const recipeToUpdate = this.recipeData;
    this.recipeService.update(this.recipeData.id, recipeToUpdate)
      .subscribe((response: Recipe) => {
        this.dataSource.data = this.dataSource.data.map((recipe: Recipe) =>
          recipe.id === response.id ? response : recipe
        );
      });
  }

  private deleteRecipe(recipeId: number): void {
    this.recipeService.delete(recipeId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((recipe: Recipe) => recipe.id !== recipeId);
      });
  }

  onEditItem(element: Recipe) {
    this.isEditMode = true;
    this.recipeData = element;
  }

  onDeleteItem(element: Recipe) {
    this.deleteRecipe(element.id);
  }

  onCancelEdit() {
    this.resetEditState();
    this.getAllRecipes();
  }

  onRecipeAdded(element: Recipe) {
    this.recipeData = element;
    this.createRecipe();
    this.resetEditState();
  }

  onRecipeUpdated(element: Recipe) {
    this.recipeData = element;
    this.updateRecipe();
    this.resetEditState();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getAllRecipes();
  }
}
