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

  autoAssignToUser(userId: number): Observable<Recommendation[]> {
    return this.http.post<Recommendation[]>(
      `${this.basePath}${this.resourceEndpoint}/auto-assign/${userId}`,
      undefined // body vacío, pero no null
    );
  }
}
