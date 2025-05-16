import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MealPlanListComponent} from './meal-plan/pages/meal-plan-list/meal-plan-list.component';
import {MealPlanDetailComponent} from './meal-plan/pages/meal-plan-detail/meal-plan-detail.component';
import {LayoutComponent} from './public/components/layout/layout.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MealPlanListComponent, MealPlanDetailComponent, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app';
}
