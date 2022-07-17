export interface User {
  id: string;
  uId?: string;
  email?: string;
  name?: string;
  bestRecord?: {
    normal?: BestRecord;
    timeChallenge?: BestRecord;
  };
}

export interface BestRecord {
  score: number;
  responseId: string;
  totalTime: number;
  mode: string;
}
