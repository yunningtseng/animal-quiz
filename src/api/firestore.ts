import {
  getDoc,
  doc,
  query,
  collection,
  getDocs,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../utils/firebaseInit';
import { Response, ResponseFS } from '../types/response';
import { Question } from '../types/question';

const firestoreApi = {
  // - 取得測驗題目
  getQuestions: async (): Promise<Question[]> => {
    const q = query(collection(db, 'questions'));
    const snapshot = await getDocs(q);
    const list: Question[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data() as Question;
      list.push(data);
    });
    return list;
  },
  // - 取得特定題目
  getQuestion: async (id: string): Promise<Question> => {
    const docRef = doc(db, 'questions', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Question;
  },
  // - 儲存作答回應
  setResponse: async (response: Response): Promise<void> => {
    const docRef = doc(db, 'responses', response.id);
    await setDoc(docRef, {
      ...response,
      startTime: Timestamp.fromDate(new Date(response.startTime)),
    });
  },
  // - 取得特定作答回應
  getResponse: async (id: string): Promise<Response> => {
    const docRef = doc(db, 'responses', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as ResponseFS;
    return {
      ...data,
      // * Timestamp 轉 string
      startTime: data.startTime.toDate().toISOString(),
    };
  },
};

export default firestoreApi;
