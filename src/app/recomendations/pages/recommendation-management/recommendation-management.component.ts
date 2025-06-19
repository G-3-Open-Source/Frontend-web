import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RecommendationsService } from '../../services/recommendations.service';
import { Recommendation } from '../../model/recommendation.entity';
import { RecommendationFormDialogComponent } from '../../../public/components/recommendation-form-dialog/recommendation-form-dialog.component';
import {DatePipe, NgClass} from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-recommendation-management',
  templateUrl: './recommendation-management.component.html',
  styleUrls: ['./recommendation-management.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginator,
    MatSort,
    MatIconModule,
    TranslateModule,
    DatePipe
  ]
})
export class RecommendationManagementComponent implements OnInit, AfterViewInit {
  recommendationData: Recommendation;
  dataSource = new MatTableDataSource<Recommendation>();
  displayedColumns: string[] = [
    'id',
    'reason',
    'time_of_day',
    'created_at',
    'notes',
    'score',
    'status',
    'actions'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private recommendationsService: RecommendationsService,
    private dialog: MatDialog
  ) {
    this.recommendationData = new Recommendation();
  }

  ngOnInit(): void {
    this.getAllRecommendations();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getAllRecommendations(): void {
    this.recommendationsService.getAll().subscribe({
      next: (response) => {
        this.dataSource.data = response;
      },
      error: (err) => {
        console.error('Error loading recommendations:', err);
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(RecommendationFormDialogComponent, {
      width: '600px',
      data: {
        recommendation: new Recommendation(),
        isEditMode: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createRecommendation(result);
      }
    });
  }

  openEditDialog(element: Recommendation): void {
    const dialogRef = this.dialog.open(RecommendationFormDialogComponent, {
      width: '600px',
      data: {
        recommendation: {...element},
        isEditMode: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateRecommendation(result);
      }
    });
  }

  private createRecommendation(recommendation: Recommendation): void {
    this.recommendationsService.create(recommendation).subscribe({
      next: (response) => {
        this.dataSource.data = [...this.dataSource.data, response];
      },
      error: (err) => {
        console.error('Error creating recommendation:', err);
      }
    });
  }

  private updateRecommendation(recommendation: Recommendation): void {
    this.recommendationsService.update(recommendation.id, recommendation).subscribe({
      next: (response) => {
        this.dataSource.data = this.dataSource.data.map(item =>
          item.id === response.id ? response : item
        );
      },
      error: (err) => {
        console.error('Error updating recommendation:', err);
      }
    });
  }

  deleteRecommendation(id: number): void {
    if (confirm('Are you sure you want to delete this recommendation?')) {
      this.recommendationsService.delete(id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
        },
        error: (err) => {
          console.error('Error deleting recommendation:', err);
        }
      });
    }
  }
}
