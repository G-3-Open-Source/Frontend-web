export class Recommendation {
  id: number;
  reason: string;
  time_of_day: string;
  created_at: string;
  notes: string;
  score: number;
  status: string;

  constructor() {
    this.id = 0;
    this.reason = "";
    this.time_of_day = "";
    this.created_at = "";
    this.notes = "";
    this.score = 0;
    this.status = "";
  }
}
