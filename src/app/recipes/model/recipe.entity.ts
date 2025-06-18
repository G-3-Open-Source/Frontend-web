export class Recipe {
  id: number;
  name: string;
  ingredients: string;
  description: string;
  category: string;
  preparationTime: number;
  difficulty: string;

  constructor() {
    this.id = 0;
    this.name = "";
    this.ingredients = "";
    this.description = "";
    this.category = "";
    this.preparationTime = 0;
    this.difficulty = "";
  }
}
