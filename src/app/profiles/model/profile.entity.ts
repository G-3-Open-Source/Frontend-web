export interface Profile {
  id: number;
  gender: string;
  height: number;
  weight: number;
  userScore: number;
  activityLevelId: number;
  activityLevelName: string;
  objectiveId: number;
  objectiveName: string;
  allergyNames?: string[];
}


