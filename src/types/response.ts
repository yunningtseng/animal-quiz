import { Timestamp } from 'firebase/firestore';

export interface Response {
  id: string;
  score: number;
  // * 要用 string or number 存日期 redux 才不會出問題
  startTime: string;
  totalTime: string;
  userName: string;
  data: Answer[];
}

export interface ResponseFS extends Omit<Response, 'startTime'> {
  startTime: Timestamp;
}

export interface Answer {
  answer: number | number[];
  correct: boolean;
  questionId: string;
}
