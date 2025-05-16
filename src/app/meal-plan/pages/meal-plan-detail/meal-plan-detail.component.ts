import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MealPlanService } from '../../services/meal-plan.service';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-meal-plan-detail',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './meal-plan-detail.component.html',
  styleUrls: ['./meal-plan-detail.component.css']
})
export class MealPlanDetailComponent implements OnInit {
  plan: any;
  editMode = false;
  planForm: FormGroup;
  showDeleteModal = false;

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
      total_carbs: ['', [Validators.required, Validators.min(0)]],
      total_proteins: ['', [Validators.required, Validators.min(0)]],
      total_fats: ['', [Validators.required, Validators.min(0)]],
      calories_per_day: ['', [Validators.required, Validators.min(0)]],
      goal: ['', Validators.required],
      is_current: [false]
    });
  }

  ngOnInit(): void {
    const planId: any = this.route.snapshot.paramMap.get('id');
    this.loadPlan(planId);
  }
  enableEdit() {
    this.editMode = true;
  }
  loadPlan(id: string): void {
    this.planService.getMealPlanById(id).subscribe({
      next: (data) => {
        this.plan = data;
        this.planForm.patchValue(data);
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
      this.planForm.patchValue(this.plan);
    }
  }

  savePlan(): void {
    if (this.planForm.valid) {
      const updatedPlan = { ...this.plan, ...this.planForm.value };
      this.planService.saveMealPlan(this.plan.id, updatedPlan).subscribe({
        next: () => {
          this.plan = updatedPlan;
          this.editMode = false;
          this.snackBar.open('Plan actualizado con éxito', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error updating plan:', err);
          this.snackBar.open('Error al actualizar el plan', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  calculateCalories(): number {
    if (this.planForm.valid) {
      const { total_carbs, total_proteins, total_fats } = this.planForm.value;
      return (total_carbs * 4) + (total_proteins * 4) + (total_fats * 9);
    }
    return 0;
  }
  confirmDelete(): void {
    this.showDeleteModal = true;
  }

  deletePlan(): void {
    this.planService.deleteMealPlan(this.plan.id).subscribe({
      next: () => {
        this.router.navigate(['/meal-plan']);
      },
      error: (err) => {
        console.error('Error deleting plan:', err);
        this.showDeleteModal = false;
      }
    });
  }
}
