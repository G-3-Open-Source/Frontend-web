import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Recommendation } from "../model/recommendation.entity";

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService extends BaseService<Recommendation> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/recommendations';
  }
}
