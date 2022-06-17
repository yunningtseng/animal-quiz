import { getDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebaseInit';
import { Response } from '../types/response';
import { Question } from '../types/question';

const firestoreApi = {
  getResponse: async (id: string): Promise<Response> => {
    const docRef = doc(db, 'responses', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Response;
  },
  getQuestion: async (id: string): Promise<Question> => {
    const docRef = doc(db, 'questions', id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as Question;
  },
};

export default firestoreApi;
