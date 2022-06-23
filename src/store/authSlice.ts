import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userId: string;
  userName: string;
}

const initialState: UserState = {
  userId: '',
  userName: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice;
