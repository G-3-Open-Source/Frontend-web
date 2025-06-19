import { Routes } from '@angular/router';

import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { IngredientManagementComponent } from "./ingredients/pages/ingredient-management/ingredient-management.component";
import {RecipeManagementComponent} from './recipes/pages/recipe-management/recipe-management.component';
import {LayoutComponent} from './public/components/layout/layout.component';
import {TrackingManagementComponent} from './tracking/pages/tracking-management/tracking-management.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'recipe/ingredients', component: IngredientManagementComponent },
      { path: 'recipe/recipe', component: RecipeManagementComponent },
      {path: 'tracking', component: TrackingManagementComponent},
      {path: 'meal-plan',
        loadChildren: () =>
          import('./meal-plan/meal-plan.module').then(m => m.MealPlanModule)
      },

      { path: '**', component: PageNotFoundComponent }
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
  ];
