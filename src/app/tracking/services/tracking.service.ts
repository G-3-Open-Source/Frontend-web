import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import {Tracking} from '../model/tracking.entity';


@Injectable({
  providedIn: 'root'
})
export class TrackingService extends BaseService<Tracking> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/tracking';
  }
}
