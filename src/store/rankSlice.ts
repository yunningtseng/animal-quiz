import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createRoutesFromChildren } from 'react-router-dom';
import type { AppThunk } from './store';
import { User } from '../types/user';
import firestoreApi from '../api/firestore';
import { Response } from '../types/response';

export interface RankingState {
  rankingList: User[];
  roomRankingList: Response[];
  roomId: string;
}

const initialState: RankingState = {
  // - 取前十名
  rankingList: [],
  roomRankingList: [],
  roomId: '',
};

const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    setRankingList(state: RankingState, action: PayloadAction<User[]>) {
      state.rankingList = action.payload;
    },
    setRoomRankingList(
      state: RankingState,
      action: PayloadAction<{ roomId: string; list: Response[] }>,
    ) {
      const { roomId, list } = action.payload;
      state.roomId = roomId;
      state.roomRankingList = list;
    },
  },
});

export const { setRankingList, setRoomRankingList } = rankingSlice.actions;

export const fetchRankingList = (mode: string): AppThunk => async (dispatch, getState) => {
  const list = await firestoreApi.getRankingList(mode);
  dispatch(setRankingList(list));
};

// TODO
export const fetchRoomRankingList = (roomId: string): AppThunk => async (dispatch, getState) => {
  const list = await firestoreApi.getRoomRankingList(roomId);
  dispatch(setRoomRankingList({ roomId, list }));
};
export default rankingSlice;
