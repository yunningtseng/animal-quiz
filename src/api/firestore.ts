import {
  getDoc,
  doc,
  query,
  collection,
  getDocs,
  setDoc,
  Timestamp,
  limit,
} from 'firebase/firestore';
import { db } from '../utils/firebaseInit';
import { Response, ResponseFS } from '../types/response';
import { Question } from '../types/question';

function randomNumbers(max: number, length: number) {
  const arr: number[] = [];
  while (arr.length < length) {
    const numNumber = Math.floor(Math.random() * (max - 1) + 1);
    if (!arr.includes(numNumber)) {
      arr.push(numNumber);
    }
  }
  return arr;
}

const firestoreApi = {
  // - 取得測驗題目
  getQuestions: async (idList?: string[]): Promise<Question[]> => {
    let qIdList: string[];
    if (idList === undefined) {
      qIdList = randomNumbers(19, 10).map((e) => String(e).padStart(4, '0'));
    } else {
      qIdList = [...idList];
    }

    const results: Promise<Question>[] = [];
    qIdList.forEach((qId) => results.push(firestoreApi.getQuestion(qId)));
    const questionListLocal = await Promise.all(results);

    return questionListLocal;
  },
  // - 取得特定題目
  getQuestion: async (id: string): Promise<Question> => {
    const docRef = doc(db, 'questions', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Question;
  },
  // - 儲存作答回應
  setResponse: async (response: Response): Promise<void> => {
    // - 創一個空 doc
    const docRef = doc(collection(db, 'responses'));
    // - docRef.id 是 firestore 自創的 unique id
    await setDoc(docRef, {
      ...response,
      id: docRef.id,
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
