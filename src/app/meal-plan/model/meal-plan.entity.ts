export class MealPlan {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public total_carbs: number,
    public total_proteins: number,
    public total_fats: number,
    public calories_per_day: number,
    public goal: string,
    public is_current: boolean,
    public profile_id: number,
    public created_at: string,

  ) {}

  /*  isValidForUser(bmi: number, age: number): boolean {
      return (
        bmi >= this.min_bmi &&
        bmi <= this.max_bmi &&
        age >= this.min_age &&
        age <= this.max_age
      );
    }*/
}

export class MealPlanDay {
  constructor(
    public meal_plan_id: number,
    public recipe_id: number,
    public day: number,
    public id: string,
  ){}
}
export class MealPlanType{
  constructor(
    public id: number,
    public type: string,
  ) {
  }
}

export class MealPlanTags{
  constructor(
    public id: number,
    public tag: string,
    public meal_plan_id: number,
  ) {
  }
}
