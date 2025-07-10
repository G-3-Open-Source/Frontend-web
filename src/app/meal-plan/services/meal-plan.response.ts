export interface MealPlanResponse {
  id: number;
  name: string;
  description: string;
  carbs: number;
  proteins: number;
  fats: number;
  calories: number;
  isCurrent: boolean;
  category: string;
  profileId: number;
  entries: MealPlanEntriesResponse[];
  tags: string[];
}

export interface MealPlanEntriesResponse{
  id: number;
  recipeId: number;
  day: number;
  mealPlanType: string;
  mealPlanId: number;
}

export interface MealPlanTagsResponse{
  //id: number;
  tag: string;
  //meal_plan_id: number;
}
export interface MealPlanTypeResponse{
  id: number;
  type: string;
}
