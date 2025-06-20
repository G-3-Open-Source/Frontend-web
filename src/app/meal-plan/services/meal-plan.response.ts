export interface MealPlanResponse {
  id: number;
  name: string;
  description: string;
  total_carbs: number;
  total_proteins: number;
  total_fats: number;
  calories_per_day: number;
  goal: string;
  is_current: boolean;
  profile_id: number;
  created_at: string;
}

export interface MealPlanPlayResponse{
  meal_plan_id: number;
  recipe_id: number;
  day: number;
  id: string;
}

export interface MealPlanTypeResponse{
  id: number;
  type: string;
}
export interface MealPlanTags{
  id: number;
  tag: string;
  meal_plan_id: number;
}
