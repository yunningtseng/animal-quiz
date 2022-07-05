import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Multiplayer } from '../types/multiplayer';
import type { AppThunk } from './store';

export interface MultiplayerState {
  multiplayer: Multiplayer;
}

const initialState: MultiplayerState = {
  multiplayer: {} as Multiplayer,
  //   user: {} as User,
};

const multiplayerSlice = createSlice({
  name: 'multiplayer',
  initialState,
  reducers: {},
});

// export const {  } = multiplayerSlice.actions;

export default multiplayerSlice;
