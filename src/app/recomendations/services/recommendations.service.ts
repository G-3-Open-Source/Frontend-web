import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
;
import { Recommendation } from '../model/recommendation.entity';
import {BaseService} from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService extends BaseService<Recommendation> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/recommendations'; // Define el endpoint correcto
  }
}
