import {Component, OnInit} from '@angular/core';
import {MealPlan, MealPlanTags} from '../../model/meal-plan.entity';
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
  selectedTag: string = '';
  selectedCalories: number = 0;
  tags: string[] = [];
  calories: number[] = [];
  constructor(private dataService: MealPlanService, private router: Router) {
  }

  ngOnInit(): void {

    this.dataService.getAllMealPlans().subscribe({
      next: (data) => {
        console.log('Data fetched:', data);
        this.mealPlans = data;
        this.filteredMealPlans = data;
        this.tags = [...new Set(this.mealPlans.map(plan => plan.tags).flat())];
        this.calories = [...new Set(this.mealPlans.map(plan => plan.calories))];
      },
      error: (err) => console.error('Error fetching data:', err)

    })
  }
  goToCreateMealPlan(): void {
    this.router.navigate(['/meal-plan/create-plan']);
  }
filterByCalories(): void {
  if (this.selectedCalories) {
    this.filteredMealPlans = this.mealPlans.filter(plan => plan.calories == this.selectedCalories);
  } else {
    this.filteredMealPlans = [...this.mealPlans];
  }
}
  filterByTag(): void {
    if (this.selectedTag) {
      this.filteredMealPlans = this.mealPlans.filter(plan => plan.tags.includes(this.selectedTag));
    } else {
      this.filteredMealPlans = [...this.mealPlans];
    }
  }
  resetFilters(): void {
    this.filteredMealPlans = [...this.mealPlans];
  }
}
