import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recommendation } from '../model/recommendation.entity';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';

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

  // Auto-asignar recomendaciones a un usuario (sin enviar body)
  autoAssignToUser(userId: number): Observable<Recommendation[]> {
    // No se envía body, solo los parámetros de configuración si es necesario (como headers)
    return this.http.post<Recommendation[]>(
      `${this.basePath}${this.resourceEndpoint}/auto-assign/${userId}`,
      undefined,
      this.httpOptions
    );
  }
}
