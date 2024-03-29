import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi from '../api/auth';
import firestoreApi from '../api/firestore';
import { User } from '../types/user';
import type { AppThunk } from './store';

export interface AuthState {
  user: User;
  isLogin: boolean;
  error: string;
  initState: boolean;
}

const initialState: AuthState = {
  user: {} as User,
  isLogin: false,
  error: '',
  initState: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUserName: (state: AuthState, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    setAccount: (
      state: AuthState,
      action: PayloadAction<{ email: string; uId: string; name: string }>,
    ) => {
      const { uId, email, name } = action.payload;
      state.user.uId = uId;
      state.user.email = email;
      state.user.name = name;
    },
    setIsLogin: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setError: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setInitState: (state: AuthState, action: PayloadAction<boolean>) => {
      state.initState = action.payload;
    },
    clearState: () => initialState,
  },
});

export const {
  setUser,
  setUserName,
  setAccount,
  setIsLogin,
  setError,
  setInitState,
  clearState,
} = authSlice.actions;

export const initAuth = (): AppThunk => async (dispatch) => {
  let userId = localStorage.getItem('userId');

  let user: User | undefined;

  if (!userId) {
    userId = firestoreApi.generateUniqueId();
    localStorage.setItem('userId', userId);
  } else {
    // TODO 改 listen
    user = await firestoreApi.getUser(userId);
  }

  user ??= {
    id: userId,
  };

  dispatch(setUser(user));
  if (user.uId || user.name) {
    dispatch(setIsLogin(true));
  }
  dispatch(setInitState(true));
};

export const confirmUserName = (userName: string): AppThunk => async (dispatch, getState) => {
  dispatch(setUserName(userName));
  const { user } = getState().auth;
  await firestoreApi.setUser(user);
  dispatch(setIsLogin(true));
};

export const updateUser = (user: User): AppThunk => async (dispatch, getState) => {
  dispatch(setUser(user));
  await firestoreApi.setUser(user);
};

export const googleLogin = (): AppThunk => async (dispatch, getState) => {
  const result = await authApi.loginWithGoogle();

  if (result.error) {
    let error = '';
    if (result.error === 'auth/popup-closed-by-user') {
      error = '登入失敗';
    }

    dispatch(setError(error));
  }

  if (result.uId) {
    const user = await firestoreApi.findUser(result.uId);
    if (user) {
      dispatch(setUser(user));
      localStorage.setItem('userId', user.id);
    } else {
      dispatch(
        setAccount({
          uId: result.uId,
          email: result.userEmail,
          name: result.userName,
        }),
      );

      const localUser = getState().auth.user;
      await firestoreApi.setUser(localUser);
    }
    dispatch(setIsLogin(true));
  }
};

export const emailRegister = (name: string, email: string, password: string): AppThunk => async (dispatch, getState) => {
  const result = await authApi.createWithEmail(email, password);

  if (result.error) {
    let error = '';
    if (result.error === 'auth/invalid-email') {
      error = 'email 格式不符';
    }
    if (result.error === 'auth/email-already-in-use') {
      error = '此帳號已註冊';
    }
    if (result.error === 'auth/weak-password') {
      error = '密碼請至少輸入六碼';
    }

    dispatch(setError(error));
  }

  if (result.uId) {
    const user = await firestoreApi.findUser(result.uId);
    if (user) {
      dispatch(setUser(user));
      localStorage.setItem('userId', user.id);
    } else {
      dispatch(
        setAccount({
          uId: result.uId,
          email: result.userEmail,
          name,
        }),
      );

      const localUser = getState().auth.user;
      await firestoreApi.setUser(localUser);
    }
    dispatch(setIsLogin(true));
  }
};

export const emailLogin = (email: string, password: string): AppThunk => async (dispatch, getState) => {
  const result = await authApi.signInWithEmail(email, password);

  if (result.error) {
    let error = '';

    if (result.error === 'auth/invalid-email') {
      error = 'email 格式不符';
    }
    if (result.error === 'auth/user-not-found') {
      error = '查無此用戶';
    }
    if (result.error === 'auth/wrong-password') {
      error = '密碼錯誤';
    }
    dispatch(setError(error));
  }

  if (result.uId) {
    const user = await firestoreApi.findUser(result.uId);
    if (user) {
      dispatch(setUser(user));
      localStorage.setItem('userId', user.id);
    }
    dispatch(setIsLogin(true));
  }
};

export const logout = (): AppThunk => async (dispatch) => {
  const result = await authApi.signOut();
  if (!result.error) {
    dispatch(clearState());
    localStorage.clear();
    dispatch(initAuth());
  }
};

export default authSlice;
