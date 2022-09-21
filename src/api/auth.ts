import { FirebaseError } from 'firebase/app';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../utils/firebaseInit';

const provider = new GoogleAuthProvider();

const authApi = {
  loginWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);

      // const token = credential?.accessToken;
      const { user } = result;
      const uId = user.uid;
      const userName = user.displayName ?? '';
      const userEmail = user.email ?? '';

      return { uId, userName, userEmail };
    } catch (e) {
      const err = e as FirebaseError;

      return { error: err.code };
    }
  },

  createWithEmail: async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const { user } = result;
      const uId = user.uid;
      const userEmail = user.email ?? '';

      return { uId, userEmail };
    } catch (e) {
      const err = e as FirebaseError;

      return { error: err.code };
    }
  },

  signInWithEmail: async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const uId = user.uid;

      return { uId };
    } catch (e) {
      const err = e as FirebaseError;

      return { error: err.code };
    }
  },

  signOut: async () => {
    try {
      const result = await signOut(auth);

      return {};
    } catch (e) {
      const err = e as FirebaseError;

      return { error: err.code };
    }
  },
};

export default authApi;
