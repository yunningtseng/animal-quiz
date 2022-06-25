import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestoreApi from '../api/firestore';
import { User } from '../types/user';
import type { AppThunk } from './store';

export interface AuthState {
  user: User;
}

const initialState: AuthState = {
  user: {} as User,
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
  },
});

export const { setUser, setUserName } = authSlice.actions;

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

  if (!user) {
    user = {
      id: userId,
    } as User;
  }
  dispatch(setUser(user));
};

export const confirmUserName = (): AppThunk => async (dispatch, getState) => {
  const { user } = getState().auth;
  await firestoreApi.setUser(user);
};

export default authSlice;
