import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { RecommendationsService } from '../../services/recommendations.service';
import { Recommendation } from '../../model/recommendation.entity';
import { RecommendationFormDialogComponent } from '../../../public/components/recommendation-form-dialog/recommendation-form-dialog.component';
import { RecommendationTemplateService } from '../../services/recommendation-template.service';
import { RecommendationTemplate } from '../../model/recommendation-template.entity';

@Component({
  selector: 'app-recommendation-management',
  standalone: true,
  templateUrl: './recommendation-management.component.html',
  styleUrls: ['./recommendation-management.component.css'],
  imports: [
    MatCardModule,
    MatIconModule,
    TranslateModule,
    CommonModule
  ]
})
export class RecommendationManagementComponent implements OnInit {
  dataSource: any[] = [];
  templates: RecommendationTemplate[] = [];
  userId: number | null = null;

  constructor(
    private recommendationsService: RecommendationsService,
    private templateService: RecommendationTemplateService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? +storedUserId : null;

    this.templateService.getAllArray().subscribe((templates) => {
      this.templates = templates;

      if (this.userId) {
        // Nueva lógica: solo auto-asignar si el usuario no tiene recomendaciones
        this.recommendationsService.getByUserId(this.userId).subscribe({
          next: (recommendations: Recommendation[]) => {
            if (recommendations && recommendations.length > 0) {
              this.dataSource = recommendations.map(rec => ({
                ...rec,
                template: this.templates.find(
                  t => t.id == (rec.templateId ?? rec.template?.id)
                )
              }));
            } else {
              // Si no hay recomendaciones, auto-asignar
              this.recommendationsService.autoAssignToUser(this.userId as number).subscribe({
                next: (autoRecommendations: Recommendation[]) => {
                  this.dataSource = autoRecommendations.map(rec => ({
                    ...rec,
                    template: this.templates.find(
                      t => t.id == (rec.templateId ?? rec.template?.id)
                    )
                  }));
                },
                error: (err: any) => {
                  console.error('Error auto-assign recommendations:', err);
                  this.dataSource = [];
                }
              });
            }
          },
          error: (err: any) => {
            console.error('Error obteniendo recomendaciones del usuario:', err);
            this.dataSource = [];
          }
        });
      } else {
        // Modo anterior: cargar todas si no hay userId
        this.getAllRecommendations();
      }
    });
  }

  private getRecommendationsByUserId(userId: number): void {
    this.recommendationsService.getByUserId(userId).subscribe({
      next: (response: Recommendation[]) => {
        this.dataSource = response.map(rec => ({
          ...rec,
          template: this.templates.find(
            t => t.id == (rec.templateId ?? rec.template?.id)
          )
        }));
      },
      error: (err: any) => console.error('Error loading recommendations by userId:', err)
    });
  }

  private getAllRecommendations(): void {
    this.recommendationsService.getAllArray().subscribe({
      next: (response: Recommendation[]) => {
        this.dataSource = response.map(rec => ({
          ...rec,
          template: this.templates.find(
            t => t.id == (rec.templateId ?? rec.template?.id)
          )
        }));
      },
      error: (err: any) => console.error('Error loading recommendations:', err)
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(RecommendationFormDialogComponent, {
      width: '600px',
      data: {
        recommendation: new Recommendation(),
        isEditMode: false,
        templates: this.templates
      }
    });

    dialogRef.afterClosed().subscribe((result: Recommendation | undefined) => {
      if (result) {
        this.createRecommendation(result);
      }
    });
  }

  openEditDialog(element: Recommendation): void {
    const dialogRef = this.dialog.open(RecommendationFormDialogComponent, {
      width: '600px',
      data: {
        recommendation: { ...element },
        isEditMode: true,
        templates: this.templates
      }
    });

    dialogRef.afterClosed().subscribe((result: Recommendation | undefined) => {
      if (result) {
        this.updateRecommendation(result);
      }
    });
  }

  private createRecommendation(recommendation: Recommendation): void {
    this.recommendationsService.create(recommendation).subscribe({
      next: (response: Recommendation) => {
        const template = this.templates.find(
          t => t.id == (response.templateId ?? response.template?.id)
        );
        this.dataSource = [...this.dataSource, { ...response, template }];
      },
      error: (err: any) => console.error('Error creating recommendation:', err)
    });
  }

  private updateRecommendation(recommendation: Recommendation): void {
    const { id, ...rest } = recommendation;
    this.recommendationsService.updateRecommendation(id, rest).subscribe({
      next: (response: Recommendation) => {
        const index = this.dataSource.findIndex(item => item.id === response.id);
        if (index !== -1) {
          const template = this.templates.find(
            t => t.id == (response.templateId ?? response.template?.id)
          );
          this.dataSource[index] = { ...response, template };
          this.dataSource = [...this.dataSource];
        }
      },
      error: (err: any) => console.error('Error updating recommendation:', err)
    });
  }

  deleteRecommendation(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta recomendación?')) {
      this.recommendationsService.delete(id).subscribe({
        next: () => {
          this.dataSource = this.dataSource.filter(item => item.id !== id);
        },
        error: (err: any) => console.error('Error deleting recommendation:', err)
      });
    }
  }
}
