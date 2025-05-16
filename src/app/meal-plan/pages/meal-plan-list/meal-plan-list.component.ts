import {Component, OnInit} from '@angular/core';
import {MealPlan} from '../../model/meal-plan.entity';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {MealItemComponent} from '../../components/meal-item/meal-item.component';
import {MealPlanService} from '../../services/meal-plan.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-meal-plan-list',
  imports: [MatCardModule, NgForOf, FormsModule
    , MealItemComponent, NgIf],
  templateUrl: './meal-plan-list.component.html',
  styleUrl: './meal-plan-list.component.css'
})
export class MealPlanListComponent implements OnInit{
  mealPlans: MealPlan[] = [];
  filteredMealPlans: MealPlan[] = [];
  selectedGoal: string = '';
  selectedCalories: number = 0;
  goals: string[] = [];
  calories_per_day: number[] = [];
  constructor(private dataService: MealPlanService, private router: Router) {
  }

  ngOnInit(): void {

    this.dataService.getAllMealPlans().subscribe({
      next: (data) => {
        console.log('Data fetched:', data);
        this.mealPlans = data;
        this.filteredMealPlans = data;
        this.goals = [...new Set(this.mealPlans.map(plan => plan.goal))];
        this.calories_per_day = [...new Set(this.mealPlans.map(plan => plan.calories_per_day))];
      },
      error: (err) => console.error('Error fetching data:', err)

    })
  }
  goToCreateMealPlan(): void {
    this.router.navigate(['/meal-plan/create-plan']);
  }
  filterByCalories(): void {
    if (this.selectedCalories) {
      this.filteredMealPlans = this.mealPlans.filter(plan => plan.calories_per_day === this.selectedCalories);
    } else {
      this.filteredMealPlans = [...this.mealPlans];
    }
  }
  filterByGoal(): void {
    if (this.selectedGoal) {
      this.filteredMealPlans = this.mealPlans.filter(plan => plan.goal === this.selectedGoal);
    } else {
      this.filteredMealPlans = [...this.mealPlans];
    }
  }
  resetFilters(): void {
    this.filteredMealPlans = [...this.mealPlans];
  }
}
