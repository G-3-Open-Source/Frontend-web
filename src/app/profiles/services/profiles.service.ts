import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../model/profile.entity';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends BaseService<Profile> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/user-profiles';
  }
}
