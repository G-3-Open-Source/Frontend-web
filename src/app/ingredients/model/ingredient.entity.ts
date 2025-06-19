export class Ingredient {

  id: number;
  name: string;
  category: string;
  calories: number;
  carbs: number;
  proteins: number;
  fats: number;
  allergies: string;
  recipes: number;

  constructor() {
    this.id = 0;
    this.name = "";
    this.category = "";
    this.calories = 0;
    this.carbs = 0;
    this.proteins = 0;
    this.fats = 0;
    this.allergies = "";
    this.recipes = 0;
  }

}
