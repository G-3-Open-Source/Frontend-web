import { Routes } from '@angular/router';
import {LayoutComponent} from './public/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'meal-plan',
        loadChildren: () =>
          import('./meal-plan/meal-plan.module').then(m => m.MealPlanModule)
      },
    ]
  }
];
