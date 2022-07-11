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
    setUId: (state: AuthState, action: PayloadAction<string>) => {
      // state.uId = actions.payload;
    },
    setToken: (state: AuthState, action: PayloadAction<string>) => {},
    setIsLogin: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isLogin = true;
    },
  },
});

export const {
  setUser, setUserName, setUId, setToken, setIsLogin,
} = authSlice.actions;

export const initAuth = (): AppThunk => async (dispatch, getState) => {
  let userId = localStorage.getItem('userId');
  let user: User | undefined;

  if (!userId) {
    userId = firestoreApi.generateUniqueId();
    localStorage.setItem('userId', userId);
  } else {
    // - 確認 firestore 上有沒有這個 user
    user = await firestoreApi.getUser(userId);
  }

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

export const googleLogin = (): AppThunk => async (dispatch, getState) => {
  const googleId = await authApi.loginWithGoogle();
};

export default authSlice;
