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
  onSnapshot,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { db } from '../utils/firebaseInit';
import { Animal, SimpleAnimal } from '../types/animal';
import { Response, ResponseFS } from '../types/response';
import { Question } from '../types/question';
import { User } from '../types/user';
import { Room } from '../types/room';

const firestoreApi = {
  // - 產生 firestore 自創的 unique id
  generateUniqueId: () => doc(collection(db, 'users')).id,
  // - 取得測驗題目
  getQuestions: async (idList: string[]): Promise<Question[]> => {
    const results: Promise<Question>[] = [];
    idList.forEach((qId) => results.push(firestoreApi.getQuestion(qId)));
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
  setResponse: async (response: Response): Promise<string> => {
    // - 創一個空 doc
    const docRef = doc(collection(db, 'responses'));
    // - docRef.id 是 firestore 自創的 unique id
    const responseId = docRef.id;
    await setDoc(docRef, {
      ...response,
      id: responseId,
      // * string 轉 Date object 再轉 Timestamp
      startTime: Timestamp.fromDate(new Date(response.startTime)),
    });

    return responseId;
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

  // - 創 room
  setRoom: async (userId: string): Promise<Room> => {
    const docRef = doc(collection(db, 'rooms'));
    const roomId = docRef.id;
    const room = {
      id: roomId,
      pin: '1234',
      status: 'waiting',
      hostId: userId,
      userIdList: [userId],
    };

    await setDoc(docRef, room);

    return room;
  },

  // - 監聽 room doc
  // * onRoom 是一個 callback function
  listenRoom: (pin: string, onRoom: (room: Room) => void) => {
    const q = query(
      collection(db, 'rooms'),
      where('pin', '==', pin),
      where('status', '==', 'waiting'),
      limit(1),
    );

    // * 只要 query 資料有變化，就會得到新的 querySnapshot 進來
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docSnap = querySnapshot.docs[0];

      // - 取得最新的 room 並觸發 callback，去 setRoom
      const room = docSnap.data() as Room;
      // console.log(room);
      onRoom(room);

      // TODO 要等 onRoom 執行完再取消
      // - 取消監聽
      if (room.status === 'end') {
        unsubscribe();
      }
    });
  },

  addUserIdToRoom: async (pin: string, userId: string): Promise<void> => {
    const q = query(
      collection(db, 'rooms'),
      where('pin', '==', pin),
      where('status', '==', 'waiting'),
      limit(1),
    );
    const querySnap = await getDocs(q);
    const docSnap = querySnap.docs[0];
    const docRef = docSnap.ref;

    await updateDoc(docRef, {
      userIdList: arrayUnion(userId),
    });
  },
};

export default firestoreApi;
