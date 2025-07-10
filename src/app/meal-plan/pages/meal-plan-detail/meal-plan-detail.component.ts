import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MealPlanService } from '../../services/meal-plan.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-meal-plan-detail',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './meal-plan-detail.component.html',
  styleUrls: ['./meal-plan-detail.component.css']
})
export class MealPlanDetailComponent implements OnInit {
  plan: any;
  editMode = false;
  planForm: FormGroup;
  showDeleteModal = false;

  daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  mealTypes = ['Desayuno', 'Comida', 'Cena', 'Snack'];

  constructor(
    private route: ActivatedRoute,
    private planService: MealPlanService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.planForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      carbs: ['', [Validators.required, Validators.min(0)]],
      proteins: ['', [Validators.required, Validators.min(0)]],
      fats: ['', [Validators.required, Validators.min(0)]],
      calories: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      tags: [''],
      isCurrent: [false]
    });
  }

  ngOnInit(): void {
    const planId: any = this.route.snapshot.paramMap.get('id');
    this.loadPlan(planId);
    this.planForm.disable(); // Deshabilitar el formulario inicialmente
  }

  loadPlan(id: string): void {
    this.planService.getMealPlanById(id).subscribe({
      next: (data) => {
        this.plan = data;
        // Convertir el array de tags a string para el formulario
        const formData = {
          ...data,
          tags: data.tags?.join(', ') || ''
        };
        this.planForm.patchValue(formData);
      },
      error: (err) => {
        console.error('Error loading plan:', err);
        this.snackBar.open('Error al cargar el plan', 'Cerrar', { duration: 3000 });
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.planForm.enable();
    } else {
      this.planForm.disable();
      this.planForm.patchValue({
        ...this.plan,
        tags: this.plan.tags?.join(', ') || ''
      });
    }
  }

  savePlan(): void {
    if (this.planForm.valid) {
      // Convertir el string de tags de vuelta a array
      const formValue = {
        ...this.planForm.value,
        tags: this.planForm.value.tags ?
          this.planForm.value.tags.split(',').map((tag: string) => tag.trim()) : []
      };

      const updatedPlan = { ...this.plan, ...formValue };

      this.planService.saveMealPlan(this.plan.id, updatedPlan).subscribe({
        next: () => {
          this.plan = updatedPlan;
          this.editMode = false;
          this.planForm.disable();
          this.snackBar.open('Plan actualizado con éxito', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error updating plan:', err);
          this.snackBar.open('Error al actualizar el plan', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  confirmDelete(): void {
    this.showDeleteModal = true;
  }

  deletePlan(): void {
    this.planService.deleteMealPlan(this.plan.id).subscribe({
      next: () => {
        this.router.navigate(['/meal-plan']);
        this.snackBar.open('Plan eliminado con éxito', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        console.error('Error deleting plan:', err);
        this.showDeleteModal = false;
        this.snackBar.open('Error al eliminar el plan', 'Cerrar', { duration: 3000 });
      }
    });
  }
}
