import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../utils/firebaseInit';

const provider = new GoogleAuthProvider();

const authApi = {
  loginWithGoogle: async () => {
    const result = await signInWithPopup(auth, provider);

    const credential = GoogleAuthProvider.credentialFromResult(result);

    const token = credential?.accessToken;
    const { user } = result;
    const uId = user.uid;
    return uId;
  },
};

export default authApi;
