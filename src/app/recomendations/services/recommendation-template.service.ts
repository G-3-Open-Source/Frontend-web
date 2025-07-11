// src/app/recommendations/services/recommendation-template.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecommendationTemplate } from '../model/recommendation-template.entity';
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class RecommendationTemplateService extends BaseService<RecommendationTemplate> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/recommendation-templates';
  }
}
