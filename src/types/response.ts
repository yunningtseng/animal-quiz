import { Timestamp } from 'firebase/firestore';

export interface Response {
  id: string;
  score: number;
  // * 要用 string or number 存日期 redux 才不會出問題
  startTime: string;
  totalTime: string;
  userName: string;
  // TODO 改成 records
  data: Record[];
}

export interface ResponseFS extends Omit<Response, 'startTime'> {
  startTime: Timestamp;
}

export interface Record {
  answer: number[];
  correct: boolean;
  questionId: string;
}
