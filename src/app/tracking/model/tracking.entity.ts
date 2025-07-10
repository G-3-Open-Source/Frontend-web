export class Tracking {
  id: number;
  date: string; // LocalDate del backend
  userId: number;
  trackingGoal: TrackingGoal;
  consumedMacros: MacronutrientValues;
  mealPlanEntries: MealPlanEntry[];
  createdAt: string;
  updatedAt: string;

  constructor() {
    this.id = 0;
    this.date = "";
    this.userId = 0;
    this.trackingGoal = new TrackingGoal();
    this.consumedMacros = new MacronutrientValues();
    this.mealPlanEntries = [];
    this.createdAt = "";
    this.updatedAt = "";
  }
}

export class TrackingGoal {
  id: number;
  name: string;
  description: string;
  targetCalories: number;
  targetProtein: number;
  targetCarbs: number;
  targetFats: number;

  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.targetCalories = 0;
    this.targetProtein = 0;
    this.targetCarbs = 0;
    this.targetFats = 0;
  }
}

export class MacronutrientValues {
  id: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;

  constructor() {
    this.id = 0;
    this.calories = 0;
    this.protein = 0;
    this.carbs = 0;
    this.fats = 0;
  }
}

export class MealPlanEntry {
  id: number;
  mealType: string;
  foodName: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  notes: string;
  createdAt: string;

  // Agregados para edición desde receta
  userId?: number;
  recipeId?: number;
  dayNumber?: number;

  constructor() {
    this.id = 0;
    this.mealType = "";
    this.foodName = "";
    this.quantity = 0;
    this.calories = 0;
    this.protein = 0;
    this.carbs = 0;
    this.fats = 0;
    this.notes = "";
    this.createdAt = "";
  }
}

export class CreateTrackingRequest {
  userId: number;
  date: string;
  trackingGoalId: number;

  constructor() {
    this.userId = 0;
    this.date = "";
    this.trackingGoalId = 0;
  }
}

export class CreateMealPlanEntryRequest {
  userId: number;
  recipeId: number;
  mealPlanType: string;
  dayNumber: number;

  constructor() {
    this.userId = 0;
    this.recipeId = 0;
    this.mealPlanType = '';
    this.dayNumber = 0;
  }
}

export class UpdateMealPlanEntryRequest {
  mealType: string;
  foodName: string;
  quantity: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  notes: string;

  constructor() {
    this.mealType = "";
    this.foodName = "";
    this.quantity = 0;
    this.calories = 0;
    this.protein = 0;
    this.carbs = 0;
    this.fats = 0;
    this.notes = "";
  }
}

export interface BackendTrackingGoal {
  id: number;
  userId: number;
  name?: string;
  description?: string;
  targetMacros: {
    id: number;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
  };
}
