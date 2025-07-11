import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../model/recipe.entity";

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends BaseService<Recipe> {
  constructor(http: HttpClient) {
    super(http );
    this.resourceEndpoint = '/recipes';
  }
  addIngredientToRecipe(recipeId: number, ingredientId: number) {
    return this.http.put(`${this.basePath}/recipes/${recipeId}/add-ingredient`, {
      ingredientId
    }, this.httpOptions);
  }

}
