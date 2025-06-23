import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {forkJoin, map, Observable, switchMap} from 'rxjs';
import {MealPlan, MealPlanTags} from '../model/meal-plan.entity';
import {MealPlanResponse} from './meal-plan.response';
import { MealPlanAssembler} from './meal-plan.assembler';
import { BaseService} from '../../shared/services/base.service';

import {environment as env} from '../../../environments/environment';
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
