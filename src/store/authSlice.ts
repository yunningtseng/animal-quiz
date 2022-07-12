import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import authApi from '../api/auth';
import firestoreApi from '../api/firestore';
import { User } from '../types/user';
import type { AppThunk } from './store';

export interface AuthState {
  user: User;
  isLogin: boolean;
}

const initialState: AuthState = {
  user: {} as User,
  isLogin: false,
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
    setGoogleId: (state: AuthState, action: PayloadAction<string>) => {
      state.user.googleId = action.payload;
    },
    setIsLogin: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
  },
});

export const {
  setUser, setUserName, setGoogleId, setIsLogin,
} = authSlice.actions;

export const initAuth = (): AppThunk => async (dispatch) => {
  // - localstorage 取 userId
  let userId = localStorage.getItem('userId');

  let user: User | undefined;

  // - 若沒有 userId 就在 firebase 創立，並存進 localstorage
  if (!userId) {
    userId = firestoreApi.generateUniqueId();
    localStorage.setItem('userId', userId);
  } else {
    // - 確認 firestore 上有沒有這個 user
    // TODO 改 listen
    user = await firestoreApi.getUser(userId);
  }

  user ??= {
    id: userId,
  };

  dispatch(setUser(user));
  if (user.googleId) {
    dispatch(setIsLogin(true));
  }
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
  const googleId = await authApi.loginWithGoogle();
  if (googleId) {
    // - query firestore user
    const user = await firestoreApi.findUser(googleId);
    if (user) {
      // - 改登舊帳號的 user
      dispatch(setUser(user));
      localStorage.setItem('userId', user.id);
    } else {
      dispatch(setGoogleId(googleId));
      const localUser = getState().auth.user;
      await firestoreApi.setUser(localUser);
    }
    dispatch(setIsLogin(true));
  }
};

export default authSlice;
