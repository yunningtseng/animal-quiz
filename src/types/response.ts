import { Timestamp } from 'firebase/firestore';

export interface Response {
  id: string;
  score: number;

  startTime: string;
  totalTime: number;
  userId: string;
  records: Record[];
  mode: string;
  roomId?: string;
}

export interface ResponseFS extends Omit<Response, 'startTime'> {
  startTime: Timestamp;
}

export interface Record {
  answer: number[];
  correct: boolean;
  questionId: string;
}
