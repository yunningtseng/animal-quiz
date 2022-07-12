import {
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  setDoc,
  Query,
  query,
  where,
  limit,
  orderBy,
  arrayUnion,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../utils/firebaseInit';
import { Animal, SimpleAnimal } from '../types/animal';
import { Response, ResponseFS } from '../types/response';
import { Question } from '../types/question';
import { User } from '../types/user';
import { Room } from '../types/room';
// * docRef 是某個 document 在資料庫中的位置，一般從 doc() 取得
// * docRef.id 是那個 document 在該 collection 中的 id
// * docSnap 是某個 document 在某個時間點的截圖
// * docSnap.data() 取出可使用的資料
// * docSnap.ref 是那個 document 在資料庫中的位置
// * querySnap 是某個篩選條件且在某個時間點下，所有 documents 的截圖
// * querySnap.docs 轉成 array of docSnap
// * 若要取出 querySnap 中的所有資料，
//  要 querySnap.forEach 分別取出裡面 docSnap.data()，
//  並存進自訂的 array 中
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
    // - 創一個空 docRef
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
  getUsers: async (idList: string[]): Promise<(User | undefined)[]> => {
    const results: Promise<User | undefined>[] = [];
    idList.forEach((id) => results.push(firestoreApi.getUser(id)));
    const userListLocal = await Promise.all(results);

    return userListLocal;
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
  addRoom: async (
    userId: string,
    userName: string | undefined,
  ): Promise<Room> => {
    const roomIsUsedRef = doc(db, 'app', 'roomIsUsed');
    const roomIsUsedSnap = await getDoc(roomIsUsedRef);
    const roomIsUsedData = roomIsUsedSnap.data() as { list: string[] };
    const roomIsUsed = roomIsUsedData.list;

    let pin: string | undefined;
    while (!pin || roomIsUsed.includes(pin)) {
      const numNumber = Math.floor(Math.random() * 9999 + 1);
      pin = String(numNumber).padStart(4, '0');
    }

    await updateDoc(roomIsUsedRef, {
      list: arrayUnion(pin),
    });

    const docRef = doc(collection(db, 'rooms'));
    const roomId = docRef.id;
    const room = {
      id: roomId,
      pin,
      status: 'waiting',
      hostId: userId,
      userIdList: [userId],
      userNameList: [userName ?? '匿名'],
    };

    await setDoc(docRef, room);

    return room;
  },
  // - 監聽 room doc
  // * onRoom 是一個 callback function
  listenRoom: async (pin: string, onRoom: (room: Room) => void) => {
    const q = query(
      collection(db, 'rooms'),
      where('pin', '==', pin),
      where('status', '==', 'waiting'),
      limit(1),
    );
    const querySnap = await getDocs(q);
    const queryDocSnap = querySnap.docs[0];
    const docRef = queryDocSnap?.ref;

    if (!docRef) {
      return undefined;
    }

    // * 只要 query 資料有變化，就會得到新的 querySnapshot 進來
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      // - 取得最新的 room 並觸發 callback，去 setRoom
      const room = docSnap.data() as Room;
      onRoom(room);

      // TODO 要等 onRoom 執行完再取消
      // - 取消監聽
      if (room.status === 'start') {
        unsubscribe();
      }
    });

    return docRef.id;
  },
  addUserIdToRoom: async (
    pin: string,
    userId: string,
    userName: string,
  ): Promise<void> => {
    const q = query(
      collection(db, 'rooms'),
      where('pin', '==', pin),
      where('status', '==', 'waiting'),
      limit(1),
    );
    const querySnap = await getDocs(q);
    const docRef = querySnap.docs[0].ref;

    await updateDoc(docRef, {
      userIdList: arrayUnion(userId),
      userNameList: arrayUnion(userName),
    });
  },
  startRoom: async (roomId: string) => {
    const docRef = doc(db, 'rooms', roomId);
    await updateDoc(docRef, { status: 'start' });
  },
  endRoom: async (roomId: string) => {
    const docRef = doc(db, 'rooms', roomId);
    await updateDoc(docRef, { status: 'end' });
  },
  listenRoomRankingList: (
    roomId: string,
    onResponseList: (responseList: Response[]) => Promise<void>,
  ) => {
    const collectionRef = collection(db, 'responses');
    const q = query(
      collectionRef,
      where('mode', '==', 'competition'),
      where('roomId', '==', roomId),
      orderBy('score', 'desc'),
    );
    // * 第一個位置放要監聽的東西
    const unsubscribe = onSnapshot(q, (querySnap) => {
      const list: Response[] = [];
      querySnap.forEach((docSnap) => {
        list.push(docSnap.data() as Response);
      });
      onResponseList(list);
    });
  },
  findUser: async (googleId: string): Promise<User | undefined> => {
    const q = query(
      collection(db, 'users'),
      where('googleId', '==', googleId),
      limit(1),
    );
    const querySnap = await getDocs(q);
    const docSnap = querySnap.docs[0];
    // - docSnap 可能是 undefined
    const user = docSnap?.data() as User | undefined;
    return user;
  },
};

export default firestoreApi;
