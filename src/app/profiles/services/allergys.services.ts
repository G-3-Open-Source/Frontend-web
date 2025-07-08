// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Allergy } from '../model/allergy.entity';

@Injectable({ providedIn: 'root' })
export class AllergysServices extends BaseService<Allergy> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/allergies';
  }
}
