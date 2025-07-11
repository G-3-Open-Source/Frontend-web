export class Ingredient {
  id: number;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  macronutrientValuesId: number;

  constructor() {
    this.id = 0;
    this.name = "";
    this.calories = 0;
    this.proteins = 0;
    this.fats = 0;
    this.carbohydrates = 0;
    this.macronutrientValuesId = 0;
  }
}

