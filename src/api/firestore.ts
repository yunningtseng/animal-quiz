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

//  要 querySnap.forEach 分別取出裡面 docSnap.data()，
//  並存進自訂的 array 中
const firestoreApi = {
  generateUniqueId: () => doc(collection(db, 'users')).id,

  getQuestions: async (idList: string[]): Promise<Question[]> => {
    const results: Promise<Question>[] = [];
    idList.forEach((qId) => results.push(firestoreApi.getQuestion(qId)));

    const questionListLocal = await Promise.all(results);

    return questionListLocal;
  },

  getQuestion: async (id: string): Promise<Question> => {
    const docRef = doc(db, 'questions', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Question;
  },

  setResponse: async (response: Response): Promise<string> => {
    const docRef = doc(collection(db, 'responses'));

    const responseId = docRef.id;
    await setDoc(docRef, {
      ...response,
      id: responseId,

      startTime: Timestamp.fromDate(new Date(response.startTime)),
    });

    return responseId;
  },

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

  getResponse: async (id: string): Promise<Response> => {
    const docRef = doc(db, 'responses', id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data() as ResponseFS;
    return {
      ...data,

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
  getRankingList: async (mode: string): Promise<User[]> => {
    const collectionRef = collection(db, 'users');

    let quizMode = 'normal';
    if (mode === 'time-challenge') {
      quizMode = 'timeChallenge';
    }

    let newList: User[] = [];

    const q = query(
      collectionRef,
      orderBy(`bestRecord.${quizMode}.score`, 'desc'),
      orderBy(`bestRecord.${quizMode}.totalTime`),

      orderBy('name'),
      limit(10),
    );

    const querySnap = await getDocs(q);
    const list: User[] = [];
    querySnap.forEach((docSnap) => {
      list.push(docSnap.data() as User);
    });

    newList = list;
    return newList;
  },

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
      userMap: { [userId]: userName ?? '匿名' },
    };

    await setDoc(docRef, room);

    return room;
  },

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

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      const room = docSnap.data() as Room;
      onRoom(room);

      // TODO 要等 onRoom 執行完再取消

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
      [`userMap.${userId}`]: userName,
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

    const unsubscribe = onSnapshot(q, (querySnap) => {
      const list: Response[] = [];
      querySnap.forEach((docSnap) => {
        list.push(docSnap.data() as Response);
      });
      onResponseList(list);
    });
  },
  findUser: async (uId: string): Promise<User | undefined> => {
    const q = query(collection(db, 'users'), where('uId', '==', uId), limit(1));
    const querySnap = await getDocs(q);
    const docSnap = querySnap.docs[0];

    const user = docSnap?.data() as User | undefined;
    return user;
  },
};

export default firestoreApi;
