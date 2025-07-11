export class Recommendation {
  id: number;
  templateId: number; // ID del template asociado
  reason: string;
  timeOfDay: string;
  createdAt: string;
  notes: string;
  score: number;
  status: string;
  template?: any; // Objeto template opcional para el join en frontend

  constructor() {
    this.id = 0;
    this.templateId = 0;
    this.reason = "";
    this.timeOfDay = "";
    this.createdAt = "";
    this.notes = "";
    this.score = 0;
    this.status = "";
  }
}
