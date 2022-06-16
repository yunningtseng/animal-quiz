export interface Response {
  id: string;
  score: number;
  startTime: Date;
  totalTime: string;
  userName: string;
  data: Answer[];
}

export interface Answer {
  answer: number | number[];
  correct: boolean;
  questionId: string;
}
