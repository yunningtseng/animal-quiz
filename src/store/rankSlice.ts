import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Rank } from '../types/rank';

export interface RankState {
  rankList: Rank[];
  rank: Rank;
}

const initialState: RankState = {
  // - 取前十名
  rankList: [
    {
      userId: '0001',
      userName: 'ynt',
      bestScore: 90,
      bestScoreResponseId: '31231',
      totalTime: 10,
      rankNumber: 1,
    },
    {
      userId: '00002',
      userName: 'ning',
      bestScore: 80,
      bestScoreResponseId: '351464',
      totalTime: 20,
      rankNumber: 2,
    },
    {
      userId: '00003',
      userName: 'Ning',
      bestScore: 70,
      bestScoreResponseId: '351464',
      totalTime: 20,
      rankNumber: 3,
    },
    {
      userId: '00004',
      userName: 'N',
      bestScore: 60,
      bestScoreResponseId: '351464',
      totalTime: 20,
      rankNumber: 4,
    },
    {
      userId: '00005',
      userName: 'Y',
      bestScore: 50,
      bestScoreResponseId: '351464',
      totalTime: 20,
      rankNumber: 5,
    },
  ],
  rank: {} as Rank,
};

const rankSlice = createSlice({
  name: 'rank',
  initialState,
  reducers: {
    // TODO query bestScore，排序，取前十
    // setLeaderboard: (state: RankState, action: PayloadAction<string>) => {
    //   const rank = action.payload;
    //   const player = state.rankList.find((e) => e.rankNumber === rank);
    //   if (player) {
    //     state.rank = player;
    //   }
    // },
  },
});

export default rankSlice;
