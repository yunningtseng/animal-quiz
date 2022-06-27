import { Timestamp } from 'firebase/firestore';

export interface Response {
  id: string;
  score: number;
  // * 要用 string or number 存日期 redux 才不會出問題
  startTime: string;
  totalTime: number;
  userId: string;
  records: Record[];
  mode: string;
}

// * extends 延伸使用 Response，Omit 忽略 startTime 這個 key，再把 startTime 覆蓋成 Timestamp
export interface ResponseFS extends Omit<Response, 'startTime'> {
  startTime: Timestamp;
}

export interface Record {
  answer: number[];
  correct: boolean;
  questionId: string;
}
