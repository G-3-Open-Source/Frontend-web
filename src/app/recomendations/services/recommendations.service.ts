import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Recommendation, UpdateRecommendationRequest} from '../model/recommendation.entity';
import { BaseService } from '../../shared/services/base.service';
import {catchError, Observable, retry} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService extends BaseService<Recommendation> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/recommendations';
  }

  // Obtener recomendaciones por usuario
  getByUserId(userId: number): Observable<Recommendation[]> {
    return this.http.get<Recommendation[]>(
      `${this.basePath}${this.resourceEndpoint}/user/${userId}`,
      this.httpOptions
    );
  }

  autoAssignToUser(userId: number): Observable<Recommendation[]> {
    return this.http.post<Recommendation[]>(
      `${this.basePath}${this.resourceEndpoint}/auto-assign/${userId}`,
      undefined // body vacío, pero no null
    );
  }

  /**
   * Actualiza una recomendación
   * @param recommendationId ID de la recomendación a actualizar
   * @param request Objeto con los campos a actualizar (sin el id)
   */
  updateRecommendation(recommendationId: number, request: UpdateRecommendationRequest): Observable<Recommendation> {
    return this.http.put<Recommendation>(
      `${this.basePath}${this.resourceEndpoint}/${recommendationId}`,
      request,
      this.httpOptions
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }






}
