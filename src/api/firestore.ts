import {
  getDoc, doc, query, collection, getDocs,
} from 'firebase/firestore';
import { db } from '../utils/firebaseInit';
import { Response, ResponseFS } from '../types/response';
import { Question } from '../types/question';

const firestoreApi = {
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
  getQuestion: async (id: string): Promise<Question> => {
    const docRef = doc(db, 'questions', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Question;
  },
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
};

export default firestoreApi;
