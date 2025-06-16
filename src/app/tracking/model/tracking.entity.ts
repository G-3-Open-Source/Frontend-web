export class Tracking {
  id: number;
  date: string;
  time_of_day: string;
  quantity: number;
  notes: string;
  recipe_id: number;
  user_id: number;
  calories: number;
  created_at: string;

  constructor() {
    this.id = 0;
    this.date = "";
    this.time_of_day = "";
    this.quantity = 0;
    this.notes = "";
    this.recipe_id = 0;
    this.user_id = 0;
    this.calories = 0;
    this.created_at = "";
  }
}
