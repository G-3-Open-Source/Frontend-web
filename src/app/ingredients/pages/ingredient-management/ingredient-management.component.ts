import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { Ingredient } from '../../model/ingredient.entity';
import { IngredientsService } from '../../services/ingredients.service';
import { IngredientCreateAndEditComponent } from '../../components/ingredient-create-and-edit/ingredient-create-and-edit.component';

@Component({
  selector: 'app-ingredient-management',
  standalone: true,
  imports: [
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
    IngredientCreateAndEditComponent
  ],
  templateUrl: './ingredient-management.component.html',
  styleUrl: './ingredient-management.component.css'
})
export class IngredientManagementComponent implements OnInit, AfterViewInit {
  ingredientData: Ingredient;
  dataSource!: MatTableDataSource<Ingredient>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  constructor(
    private ingredientService: IngredientsService,
    private dialog: MatDialog
  ) {
    this.ingredientData = {} as Ingredient;
    this.dataSource = new MatTableDataSource<Ingredient>();
  }

  ngOnInit(): void {
    this.getAllIngredients();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllIngredients(): void {
    this.ingredientService.getAll()
      .subscribe((response: any) => {
        this.dataSource.data = response;
      });
  }

  private createIngredient(): void {
    this.ingredientService.create(this.ingredientData).subscribe((response: Ingredient) => {
      this.dataSource.data.push({ ...response });
      this.dataSource.data = [...this.dataSource.data];
    });
  }

  private deleteIngredient(ingredientId: number): void {
    this.ingredientService.delete(ingredientId).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(i => i.id !== ingredientId);
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(IngredientCreateAndEditComponent, {
      width: '500px',
      data: { ingredient: {} as Ingredient }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ingredientData = result;
        this.createIngredient();
      }
    });
  }

  onDeleteItem(element: Ingredient): void {
    this.deleteIngredient(element.id);
  }
}
