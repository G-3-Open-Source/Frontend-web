// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { ActivityLevel } from '../model/activityLevel.entity';

@Injectable({ providedIn: 'root' })
export class ActivityLevelsServices extends BaseService<ActivityLevel> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/activity-levels';
  }
}
