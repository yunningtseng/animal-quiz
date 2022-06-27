import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from './store';
import { User } from '../types/user';
import firestoreApi from '../api/firestore';

export interface RankingState {
  rankingList: User[];
}

const initialState: RankingState = {
  // - 取前十名
  rankingList: [],
};

const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    setRankingList(state: RankingState, action: PayloadAction<User[]>) {
      state.rankingList = action.payload;
    },
  },
});

export const { setRankingList } = rankingSlice.actions;

export const fetchRankingList = (): AppThunk => async (dispatch, getState) => {
  const list = await firestoreApi.getRankingList();
  dispatch(setRankingList(list));
};

export default rankingSlice;
