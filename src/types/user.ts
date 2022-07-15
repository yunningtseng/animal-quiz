export interface User {
  id: string;
  uId?: string;
  email?: string;
  name?: string;
  // bestScore?: number;
  // bestScoreResponseId?: string;
  // totalTime?: number;
  // mode?: string;
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
