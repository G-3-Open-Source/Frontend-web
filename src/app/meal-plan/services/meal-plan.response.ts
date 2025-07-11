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
export interface MealPlanDetailResponse {
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
  entries: MealPlanEntriesDetailResponse[];
  tags: string[];
}
export interface MealPlanEntriesDetailResponse {
  id: number;
  recipeId: number;
  day: number;
  recipeName: string;
  recipeDescription: string;
  mealPlanType: number;
  mealPlanId: number;
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
export interface RecipeResponse{
  id: number;
  name: string;
  description: string;
  category: string;
  recipeType: string;
  preparationTime: number;
  difficulty: string;
  ingredients: string[];
  userId: number;
}
