import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../utils/firebaseInit';

const provider = new GoogleAuthProvider();

const authApi = {
  loginWithGoogle: async () => {
    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);

    // const token = credential?.accessToken;
    const { user } = result;
    const uId = user.uid;
    const userName = user.displayName;

    return { uId, userName };
  },

  // TODO
  // - 註冊
  createWithEmail: async (email: string, password: string) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = result;
    const userEmail = user.email;

    return { userEmail };
  },

  // TODO
  // - 登入
  signInWithEmail: async (email: string, password: string) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const { user } = result;
    const userEmail = user.email;
    const userName = user.displayName;

    return { userEmail, userName };
  },
};

export default authApi;
