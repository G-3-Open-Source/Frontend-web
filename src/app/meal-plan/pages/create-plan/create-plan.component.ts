import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MealPlanService} from '../../services/meal-plan.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-plan',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.css'
})
export class CreatePlanComponent {
  planForm: FormGroup;

  constructor(private fb: FormBuilder, private mealPlanService: MealPlanService, private router: Router) {
    this.planForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      total_carbs: [0, [Validators.required, Validators.min(0)]],
      total_proteins: [0, [Validators.required, Validators.min(0)]],
      total_fats: [0, [Validators.required, Validators.min(0)]],
      calories_per_day: [0, [Validators.required, Validators.min(0)]],
      goal: ['', Validators.required],
      is_current: [false]
    });
  }

  onSubmit() {
    if (this.planForm.valid) {
      const formData = this.planForm.value;
      console.log('Plan creado:', formData);
      this.mealPlanService.createMealPlan(formData).subscribe({
          next: (response) => {
            console.log('Plan creado exitosamente:', response);
            this.router.navigate(['/meal-plan']);
          },
          error: (error) => {
            console.error('Error al crear el plan:', error);

          }
        }
      )

    } else {
      console.log('Formulario inválido');
    }
  }
}
