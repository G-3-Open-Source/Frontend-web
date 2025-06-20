import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MealPlanListComponent} from './pages/meal-plan-list/meal-plan-list.component';
import {MealPlanDetailComponent} from './pages/meal-plan-detail/meal-plan-detail.component';
import {CreatePlanComponent} from './pages/create-plan/create-plan.component';

const routes: Routes = [
  { path : '', component: MealPlanListComponent},
  { path: 'plandetail/:id', component: MealPlanDetailComponent },
  { path: 'create-plan', component: CreatePlanComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealPlanRoutingModule { }
