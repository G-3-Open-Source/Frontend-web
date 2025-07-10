import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { retry, catchError } from 'rxjs/operators';
import {
  Tracking,
  CreateTrackingRequest,
  MacronutrientValues,
  MealPlanEntry,
  CreateMealPlanEntryRequest,
  UpdateMealPlanEntryRequest, TrackingGoal, BackendTrackingGoal
} from '../model/tracking.entity';

@Injectable({
  providedIn: 'root'
})
export class TrackingService extends BaseService<Tracking> {

  constructor(private httpClient: HttpClient) {
    super(httpClient);
    this.resourceEndpoint = '/tracking';
  }

  // Crear un nuevo tracking
  createTracking(request: CreateTrackingRequest): Observable<Tracking> {
    return this.httpClient.post<Tracking>(`${this.basePath}${this.resourceEndpoint}`, request, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Obtener tracking por ID de usuario
  getTrackingByUserId(userId: number): Observable<Tracking> {
    return this.httpClient.get<Tracking>(`${this.basePath}${this.resourceEndpoint}/user/${userId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Obtener macronutrientes consumidos por tracking ID
  getConsumedMacros(trackingId: number): Observable<MacronutrientValues> {
    return this.httpClient.get<MacronutrientValues>(`${this.basePath}/macronutrients/consumed/tracking/${trackingId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Métodos para gestionar meal plan entries
  createMealPlanEntry(trackingId: number, request: CreateMealPlanEntryRequest): Observable<MealPlanEntry> {
    return this.httpClient.post<MealPlanEntry>(`${this.basePath}/meal-plan-entries/${trackingId}`, request, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Obtener todas las comidas de un tracking
  getAllMealsByTrackingId(trackingId: number): Observable<MealPlanEntry[]> {
    return this.httpClient.get<MealPlanEntry[]>(`${this.basePath}/meal-plan-entries/tracking/${trackingId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Actualizar una entrada del plan de comidas
  updateMealPlanEntry(mealPlanEntryId: number, request: UpdateMealPlanEntryRequest): Observable<MealPlanEntry> {
    return this.httpClient.put<MealPlanEntry>(`${this.basePath}/meal-plan-entries/${mealPlanEntryId}`, request, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Eliminar una entrada del plan de comidas
  removeMealPlanEntry(trackingId: number, mealPlanEntryId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.basePath}/meal-plan-entries/tracking/${trackingId}/entry/${mealPlanEntryId}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  // Override del método create para usar la nueva estructura
  override create(item: CreateTrackingRequest): Observable<Tracking> {
    return this.createTracking(item);
  }

  getTrackingGoalByUserId(userId: number): Observable<BackendTrackingGoal> {
    return this.httpClient.get<BackendTrackingGoal>(`${this.basePath}/tracking-goals/user/${userId}`, this.httpOptions);
  }


}
