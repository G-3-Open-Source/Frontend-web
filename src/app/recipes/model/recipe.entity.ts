export class Recipe {
  id: number;
  name: string;
  description: string;
  category: string;
  recipeType: string;
  preparationTime: number;
  difficulty: string;
  ingredients: string[];
  userId: number;

  constructor() {
    this.id = 0;
    this.name = "";
    this.description = "";
    this.category = "";
    this.recipeType = "";
    this.preparationTime = 0;
    this.difficulty = "";
    this.ingredients = [];
    this.userId = 0;
  }
}
