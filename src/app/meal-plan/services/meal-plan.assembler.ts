import {MealPlanResponse} from './meal-plan.response';
import {MealPlan} from '../model/meal-plan.entity';

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
        mealPlanType: entry.mealPlanType,
        id: entry.id
      })),
      tags: response.tags.map(tag => tag.trim())
    };
  }
}
