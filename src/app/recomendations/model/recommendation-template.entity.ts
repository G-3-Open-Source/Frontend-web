// src/app/recommendations/model/recommendation-template.entity.ts
export class RecommendationTemplate {
  id: number;
  title: string;
  content: string;
  category: string;

  constructor() {
    this.id = 0;
    this.title = "";
    this.content = "";
    this.category = "";
  }
}
