import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'meal-plan',
    pathMatch: 'full',
  },
      {path: 'meal-plan',
        loadChildren: () =>
          import('./meal-plan/meal-plan.module').then(m => m.MealPlanModule)
      },

];
