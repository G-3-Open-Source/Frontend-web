import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MealPlanService} from '../../services/meal-plan.service';
import {Router} from '@angular/router';
import {FormArray} from '@angular/forms';
import { OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-create-plan',
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.css'
})
export class CreatePlanComponent implements OnInit {
  planForm: FormGroup;
  profileId = 1;

  ngOnInit(): void {
    this.addEntry();
  }
  constructor(private fb: FormBuilder, private mealPlanService: MealPlanService, private router: Router) {
    this.planForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      carbs: [0, [Validators.required, Validators.min(0)]],
      proteins: [0, [Validators.required, Validators.min(0)]],
      fats: [0, [Validators.required, Validators.min(0)]],
      calories: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      isCurrent: [false],
      tags: [''],
      entries: this.fb.array([])
    });
  }

  createEntry(): FormGroup {
    return this.fb.group({
      recipeId: [1, [Validators.required, Validators.min(1)]],
      day: [1, [Validators.required, Validators.min(1), Validators.max(7)]],
      mealPlanTypeId: [1, [Validators.required, Validators.min(1)]]
    });
  }
  get entriesArray(): FormArray {
    return this.planForm.get('entries') as FormArray;
  }
  addEntry(): void {
    this.entriesArray.push(this.createEntry());
  }

  removeEntry(index: number): void {
    this.entriesArray.removeAt(index);
  }

  resetForm(): void {
    this.planForm.reset({
      name: '',
      description: '',
      carbs: 0,
      proteins: 0,
      fats: 0,
      calories: 0,
      category: '',
      isCurrent: false,
      tags: '',
      entries: []
    });

    while (this.entriesArray.length) {
      this.entriesArray.removeAt(0);
    }

    this.addEntry();
  }

  //profileId = this.authService.getProfileId();

  onSubmit() {
    if (this.planForm.valid) {
      const formData = this.planForm.value;

      const processedFormData = {
        ...formData,
        profileId: this.profileId,
        tags: formData.tags
          ? formData.tags.split(',').map((tag: string) => tag.trim())
          : [],
        entries: formData.entries.map((entry: any) => ({
          recipeId: parseInt(entry.recipeId, 10),
          day: parseInt(entry.day, 10),
          mealPlanTypeId: parseInt(entry.mealPlanTypeId, 10)
        }))
      };

      console.log('Plan creado:', processedFormData);

      this.mealPlanService.createMealPlan(processedFormData).subscribe({
        next: (response) => {
          console.log('Plan creado exitosamente:', response);
          this.router.navigate(['/meal-plan']);
        },
        error: (error) => {
          console.error('Error al crear el plan:', error);
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
