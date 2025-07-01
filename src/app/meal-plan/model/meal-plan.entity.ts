export class MealPlan {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public carbs: number,
    public proteins: number,
    public fats: number,
    public calories: number,
    public isCurrent: boolean,
    public category: string,
    public profileId: number,
    public entries: MealPlanEntries[],
    public tags: string[],

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

export class MealPlanEntries {
  constructor(
    public mealPlanId: number,
    public recipeId: number,
    public mealPlanType: string,
    public id: number,
  ){}
}

export class MealPlanTags{
  constructor(
    //public id: number,
    public tag: string,
    //public meal_plan_id: number,
  ) {
  }
}
export class MealPlanType{
  constructor(
  // public id: number,
    public type: string,
  ) {
  }
}
