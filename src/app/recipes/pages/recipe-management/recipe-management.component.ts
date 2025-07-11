import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../model/recipe.entity';
import { RecipeCreateAndEditComponent } from '../../components/recipe-create-and-edit/recipe-create-and-edit.component';

@Component({
  selector: 'app-recipe-management',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatSort,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    NgClass,
    NgFor,
    NgIf,
    TranslateModule,
    RecipeCreateAndEditComponent
  ],
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

  constructor(
    private recipeService: RecipeService,
    private dialog: MatDialog
  ) {
    this.isEditMode = false;
    this.recipeData = {} as Recipe;
    this.dataSource = new MatTableDataSource<Recipe>();
  }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
        this.dataSource.data = [...this.dataSource.data]; // trigger refresh
      });
  }

  private updateRecipe(): void {
    this.recipeService.update(this.recipeData.id, this.recipeData)
      .subscribe((response: Recipe) => {
        this.dataSource.data = this.dataSource.data.map(recipe =>
          recipe.id === response.id ? response : recipe
        );
      });
  }

  private deleteRecipe(recipeId: number): void {
    this.recipeService.delete(recipeId)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(recipe => recipe.id !== recipeId);
      });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(RecipeCreateAndEditComponent, {
      width: '500px',
      data: { editMode: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeData = result;
        this.createRecipe();
      }
    });
  }

  openEditDialog(recipe: Recipe): void {
    const dialogRef = this.dialog.open(RecipeCreateAndEditComponent, {
      width: '500px',
      data: { editMode: true, recipe }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.recipeData = result;
        this.updateRecipe();
      }
    });
  }

  onDeleteItem(recipe: Recipe): void {
    this.deleteRecipe(recipe.id);
  }

  recipeDifficultyClass(difficulty: string): string {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'easy-difficulty';
      case 'medium':
        return 'medium-difficulty';
      case 'hard':
        return 'hard-difficulty';
      default:
        return '';
    }
  }
}
