import {
  getDoc,
  doc,
  collection,
  setDoc,
  Timestamp,
  getDocs,
  limit,
  query,
  where,
  Query,
  orderBy,
} from 'firebase/firestore';
import { Animal, SimpleAnimal } from '../types/animal';
import { db } from '../utils/firebaseInit';
import { Response, ResponseFS } from '../types/response';
import { Question } from '../types/question';
import { User } from '../types/user';

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
  // - 產生 firestore 自創的 unique id
  generateUniqueId: () => doc(collection(db, 'users')).id,
  // - 取得測驗題目
  // * 若 idList 為 undefined 則會 random 題目加進 qIdList
  // * 若 idList 不為 undefined，則 qIdList 即為 idList
  getQuestions: async (idList?: string[]): Promise<Question[]> => {
    let qIdList: string[];
    if (idList === undefined) {
      qIdList = randomNumbers(19, 10).map((e) => String(e).padStart(4, '0'));
    } else {
      qIdList = [...idList];
    }

    const results: Promise<Question>[] = [];
    qIdList.forEach((qId) => results.push(firestoreApi.getQuestion(qId)));
    // - 待所有題目載入完成才會 return
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
      // * string 轉 Date object 再轉 Timestamp
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
  getUser: async (id: string): Promise<User | undefined> => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as User | undefined;
  },
  setUser: async (user: User): Promise<void> => {
    // - 將 doc 的 id 設為 user.id，非自動產生的 random id
    const docRef = doc(db, 'users', user.id);
    await setDoc(docRef, user);
  },
  getAnimals: async (className: string): Promise<SimpleAnimal[]> => {
    const collectionRef = collection(db, 'animals');
    let q: Query;
    if (className !== '') {
      q = query(collectionRef, where('class', '==', className), limit(30));
    } else {
      q = query(collectionRef, limit(30));
    }
    const querySnap = await getDocs(q);
    const list: SimpleAnimal[] = [];
    querySnap.forEach((docSnap) => {
      const data = docSnap.data() as SimpleAnimal;
      list.push(data);
    });
    return list;
  },
  getAnimal: async (id: string): Promise<Animal> => {
    const docRef = doc(db, 'animals', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Animal;
  },
  // - 取個人歷史紀錄頁面
  getResponses: async (userId: string): Promise<Response[]> => {
    const collectionRef = collection(db, 'responses');
    const q = query(
      collectionRef,
      where('userId', '==', userId),
      orderBy('startTime', 'desc'),
    );
    const querySnap = await getDocs(q);
    const list: Response[] = [];
    querySnap.forEach((docSnap) => {
      const data = docSnap.data() as ResponseFS;
      list.push({
        ...data,
        startTime: data.startTime.toDate().toISOString(),
      });
    });
    return list;
  },
  getRankingList: async (mode: string): Promise<User[]> => {
    const collectionRef = collection(db, 'users');
    const q = query(
      collectionRef,
      where('mode', '==', mode),
      orderBy('bestScore', 'desc'),
      orderBy('totalTime'),
      // * 代表必須要有 name
      orderBy('name'),
      limit(10),
    );
    const querySnap = await getDocs(q);
    const list: User[] = [];
    querySnap.forEach((docSnap) => {
      list.push(docSnap.data() as User);
    });
    return list;
  },
};

export default firestoreApi;
