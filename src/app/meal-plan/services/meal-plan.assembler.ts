import {
  MealPlanDetailResponse,
  MealPlanEntriesDetailResponse,
  MealPlanResponse,
  RecipeResponse
} from './meal-plan.response';
import {MealPlan, MealPlanDetail, MealPlanEntriesDetail} from '../model/meal-plan.entity';
import {Recipe} from '../../recipes/model/recipe.entity';

export class MealPlanAssembler {
  static toEntityFromResponseArray(responseArray: MealPlanResponse[]): MealPlan[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }
  static toEntityFromResponse(response: MealPlanResponse): MealPlan {
  console.log('MealPlanAssembler.toEntityFromResponseArray', response);
    return {
      /*      isValidForUser(bmi: number, age: number): boolean {
              return false;
            },*/
      id: response.id,
      name: response.name,
      description: response.description,
      carbs: response.carbs,
      proteins: response.proteins,
      fats: response.fats,
      calories: response.calories,
      category: response.category,
      isCurrent: response.isCurrent,
      profileId: response.profileId,
      entries: response.entries.map(entry => ({
        mealPlanId: entry.mealPlanId,
        recipeId: entry.recipeId,
        day: entry.day,
        mealPlanType: entry.mealPlanType,
        id: entry.id
      })),
      tags: response.tags.map(tag => tag.trim())
    };
  }
}
export class RecipeAssembler {
  static toEntityFromResponseArray(responseArray: RecipeResponse[]): Recipe[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }

  static toEntityFromResponse(response: RecipeResponse): Recipe {
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      category: response.category,
      recipeType: response.recipeType,
      preparationTime: response.preparationTime,
      difficulty: response.difficulty,
      ingredients: response.ingredients || [],
      userId: response.userId,
    };
  }
}
/*export class MealPlanDetailAssembler {
  static toEntityFromResponseArray(responseArray: MealPlanDetailResponse[]): MealPlanDetail[] {
    return responseArray.map(response => this.toEntityFromResponse(response));
  }

  static toEntityFromResponse(response: MealPlanDetailResponse): MealPlanDetail {
    return new MealPlanDetail(
      response.id,
      response.name,
      response.description,
      response.carbs,
      response.proteins,
      response.fats,
      response.calories,
      response.isCurrent,
      response.category,
      response.profileId,
      response.entries.map(entry => new MealPlanEntriesDetail(
        entry.id,
        entry.recipeId,
        entry.day,
        entry.recipeName,
        entry.recipeDescription,
        entry.mealPlanTypeId
      )),
      response.tags.map(tag => tag.trim())
    );
  }
}*/

export class MealPlanEntryDetailAssembler {
  static toEntityFromResponseArray(responseArray: MealPlanEntriesDetailResponse[]): MealPlanEntriesDetail[] {
    return responseArray.map(entry => this.toEntityFromResponse(entry));
  }

  static toEntityFromResponse(response: MealPlanEntriesDetailResponse): MealPlanEntriesDetail {
    return new MealPlanEntriesDetail(
      response.id,
      response.recipeId,
      response.day,
      response.recipeName,
      response.recipeDescription,
      response.mealPlanType
    );
  }
}

