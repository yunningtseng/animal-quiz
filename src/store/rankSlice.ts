import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from './store';
import firestoreApi from '../api/firestore';
import { RankItem } from '../types/rankItem';

export interface RankingState {
  rankingList: RankItem[];
  roomId?: string;
}

const initialState: RankingState = {
  rankingList: [],
};

const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    setRankingList(
      state: RankingState,
      action: PayloadAction<{ roomId?: string; list: RankItem[] }>,
    ) {
      const { roomId, list } = action.payload;
      // state.roomId = action.payload.roomId;
      state.roomId = roomId;
      state.rankingList = list;
    },
  },
});

export const { setRankingList } = rankingSlice.actions;

export const fetchRankingList = (mode: string): AppThunk => async (dispatch, getState) => {
  const list = await firestoreApi.getRankingList(mode);
  const quizMode = mode === 'time-challenge' ? 'timeChallenge' : 'normal';

  const newList = list.map((user, index) => ({
    userId: user.id,
    rank: index + 1,
    name: user.name ?? '',
    score: user.bestRecord?.[quizMode]?.score ?? 0,
    totalTime: user.bestRecord?.[quizMode]?.totalTime ?? 0,
  }));

  dispatch(setRankingList({ list: newList }));
};

export const fetchRoomRankingList = (roomId: string): AppThunk => (dispatch) => {
  firestoreApi.listenRoomRankingList(roomId, async (list) => {
    const userIdList = list.map((response) => response.userId);

    const userList = await firestoreApi.getUsers(userIdList);

    const newList = list.map((response, index) => ({
      userId: response.userId,
      rank: index + 1,
      name: userList[index]?.name ?? '匿名',
      score: response.score,
      totalTime: response.totalTime,
    }));
    dispatch(setRankingList({ roomId, list: newList }));
  });
};
export default rankingSlice;
