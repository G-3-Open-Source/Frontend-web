import {Component, Input} from '@angular/core';
import {MealPlan} from '../../model/meal-plan.entity';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-meal-item',
  imports: [MatButtonModule, MatCardModule,],
  templateUrl: './meal-item.component.html',
  styleUrl: './meal-item.component.css'
})
export class MealItemComponent {
  @Input() plan!: MealPlan;

  constructor(private router: Router) {}

  goToDetail(): void {
    this.router.navigate(['meal-plan/plandetail', this.plan.id]);
  }
}
