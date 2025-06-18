import { Routes } from '@angular/router';

import { HomeComponent } from "./public/pages/home/home.component";
import { AboutComponent } from "./public/pages/about/about.component";
import { PageNotFoundComponent } from "./public/pages/page-not-found/page-not-found.component";
import { IngredientManagementComponent } from "./ingredients/pages/ingredient-management/ingredient-management.component";
import {RecipeManagementComponent} from './recipes/pages/recipe-management/recipe-management.component';

export const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'recipe/ingredients', component: IngredientManagementComponent },
  { path: 'recipe/recipe', component: RecipeManagementComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];
