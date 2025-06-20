import {MealPlanResponse} from './meal-plan.response';
import {MealPlan} from '../model/meal-plan.entity';

export class MealPlanAssembler {
  static toEntityFromResponseArray(responseArray: MealPlanResponse[]): MealPlan[] {
    return responseArray.map((response) =>
      this.toEntityFromResponse(response));
  }

  static toEntityFromResponse(response: MealPlanResponse): MealPlan {
    return {
      /*      isValidForUser(bmi: number, age: number): boolean {
              return false;
            },*/
      id: response.id,
      name: response.name,
      description: response.description,
      total_carbs: response.total_carbs,
      total_proteins: response.total_proteins,
      total_fats: response.total_fats,
      calories_per_day: response.calories_per_day,
      goal: response.goal,
      is_current: response.is_current,
      profile_id: response.profile_id,
      created_at: response.created_at,
    };
  }
}
