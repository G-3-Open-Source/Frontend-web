import { Injectable } from '@angular/core';

import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Ingredient } from "../model/ingredient.entity";

@Injectable({
  providedIn: 'root'
})
export class IngredientsService extends BaseService<Ingredient> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/ingredients';
  }
}
