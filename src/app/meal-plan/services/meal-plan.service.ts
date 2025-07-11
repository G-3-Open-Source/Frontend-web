import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import {MealPlan, MealPlanDetail, MealPlanEntriesDetail, MealPlanTags} from '../model/meal-plan.entity';
import {
  MealPlanDetailResponse,
  MealPlanEntriesDetailResponse,
  MealPlanResponse,
  RecipeResponse
} from './meal-plan.response';
import {MealPlanAssembler, MealPlanEntryDetailAssembler, RecipeAssembler} from './meal-plan.assembler';
import { BaseService} from '../../shared/services/base.service';

import {environment as env} from '../../../environments/environment';
import {Recipe} from '../../recipes/model/recipe.entity';
@Injectable({
  providedIn: 'root'
})

export class MealPlanService extends BaseService<MealPlan> {
  constructor(protected override http: HttpClient) {
    super(http)
    this.resourceEndpoint = 'meal-plan';
  }

  //GET
  getAllMealPlans(): Observable<MealPlan[]> {
    return this.http.get<MealPlanResponse[]>(`${env.serverBasePath}/${this.resourceEndpoint}`).pipe(
      map(data => MealPlanAssembler.toEntityFromResponseArray(data)),

    );
  }
  getMealPlanEntriesWithRecipeInfo(id: number): Observable<MealPlanEntriesDetail[]> {
    return this.http.get<MealPlanEntriesDetailResponse[]>(`${env.serverBasePath}/meal-plan/detailed/${id}`).pipe(
      map(response => MealPlanEntryDetailAssembler.toEntityFromResponseArray(response)),
    );
  }
  getMealPlanById(id: string): Observable<MealPlan> {
    return this.http.get<MealPlanResponse>(`${env.serverBasePath}/${this.resourceEndpoint}/${id}`).pipe(
      map(data => MealPlanAssembler.toEntityFromResponse(data))
    );
  }
  getTags(): Observable<any> {
    return this.http.get<MealPlanTags>(`${env.serverBasePath}/meal_plan_tags`);
  }

  getDetailsMealPlanbyId(id: string): Observable<MealPlan> {
    return this.http.get<MealPlanResponse>(`${env.serverBasePath}meal-plan/${id}`).pipe(
      map(data => MealPlanAssembler.toEntityFromResponse(data))
    );
  }
  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<RecipeResponse[]>(`${env.serverBasePath}/meal-plan/recipes`).pipe(
      map(data => RecipeAssembler.toEntityFromResponseArray(data))
    );
  }



  //POST
  createMealPlan(mealPlan: MealPlan): Observable<any> {
    return this.http.post<MealPlanResponse>(`${env.serverBasePath}/${this.resourceEndpoint}`, mealPlan).pipe(
      map(data => MealPlanAssembler.toEntityFromResponse(data))
    );
  }

  //PUT
  saveMealPlan(mealPlanId: string, mealPlan: MealPlan): Observable<any> {
    return this.http.put<MealPlanResponse>(`${env.serverBasePath}/${this.resourceEndpoint}/${mealPlanId}`, mealPlan).pipe(
      map(data => MealPlanAssembler.toEntityFromResponse(data))
    );
  }
  updateMealPlan(mealPlanid: string, MealPlan: MealPlan): Observable<any> {
    return this.http.put<MealPlanResponse>(`${env.serverBasePath}/meal_plans/${mealPlanid}`, MealPlan).pipe(
      map(data => MealPlanAssembler.toEntityFromResponse(data))
    );
  }

  //DELETE
  deleteMealPlan(id: string): Observable<any> {
    return this.http.delete(`${env.serverBasePath}/${this.resourceEndpoint}/${id}`);
  }
  deleteMealPlanRecipe(id: string): Observable<any> {
    return this.http.delete(`${env.serverBasePath}meal_plan_recipes/${id}`);
  }


}
