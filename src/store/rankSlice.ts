import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/user';

export interface RankingState {
  rankingList: User[];
}

const initialState: RankingState = {
  // - 取前十名
  rankingList: [
    {
      id: '0001',
      name: 'ynt',
      bestScore: 90,
      bestScoreResponseId: '31231',
      totalTime: 10,
      rankingNumber: 1,
    },
    {
      id: '00002',
      name: 'ning',
      bestScore: 80,
      bestScoreResponseId: '351464',
      totalTime: 20,
      rankingNumber: 2,
    },
    {
      id: '00003',
      name: 'Ning',
      bestScore: 70,
      bestScoreResponseId: '351464',
      totalTime: 20,
      rankingNumber: 3,
    },
    {
      id: '00004',
      name: 'N',
      bestScore: 60,
      bestScoreResponseId: '351464',
      totalTime: 20,
      rankingNumber: 4,
    },
    {
      id: '00005',
      name: 'Y',
      bestScore: 50,
      bestScoreResponseId: '351464',
      totalTime: 20,
      rankingNumber: 5,
    },
  ],
};

const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    // TODO query bestScore，排序，取前十
    // setLeaderboard: (state: RankState, action: PayloadAction<string>) => {
    //   const rank = action.payload;
    //   const player = state.rankList.find((e) => e.rankingNumber === rank);
    //   if (player) {
    //     state.rank = player;
    //   }
    // },
  },
});

export default rankingSlice;
