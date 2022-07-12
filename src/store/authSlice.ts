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
    // TODO 把不同登入方式整合，定為登入
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

export const initAuth = (): AppThunk => async (dispatch, getState) => {
  let userId = localStorage.getItem('userId');
  // let googleId = localStorage.getItem('googleId');
  let user: User | undefined;

  // - 若沒有 userId 就在 firebase 創立，並存進 localstorage
  if (!userId) {
    userId = firestoreApi.generateUniqueId();
    localStorage.setItem('userId', userId);
  } else {
    // - 確認 firestore 上有沒有這個 user
    user = await firestoreApi.getUser(userId);
  }

  // ?
  user ??= {
    id: userId,
  };

  dispatch(setUser(user));
};

export const confirmUserName = (userName: string): AppThunk => async (dispatch, getState) => {
  dispatch(setUserName(userName));
  const { user } = getState().auth;
  await firestoreApi.setUser(user);
};

export const updateUser = (user: User): AppThunk => async (dispatch, getState) => {
  dispatch(setUser(user));
  await firestoreApi.setUser(user);
};

// TODO
export const googleLogin = (): AppThunk => async (dispatch, getState) => {
  const googleId = await authApi.loginWithGoogle();
  if (googleId) {
    dispatch(setIsLogin(true));
    dispatch(setGoogleId(googleId));
    localStorage.setItem('googleId', googleId);
  }
};

export default authSlice;
