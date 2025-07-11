export interface Allergy {
  id: number;
  name: string;
  relatedIngredients: { name: string }[];
}
