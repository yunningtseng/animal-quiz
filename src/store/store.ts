import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import quizSlice from './quizSlice';
import animalSlice from './animalSlice';
import authSlice from './authSlice';
import rankingSlice from './rankSlice';
import resultSlice from './resultSlice';
import multiplayerSlice from './multiplayerSlice';

const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
    result: resultSlice.reducer,
    animal: animalSlice.reducer,
    auth: authSlice.reducer,
    ranking: rankingSlice.reducer,
    multiplayer: multiplayerSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export default store;
