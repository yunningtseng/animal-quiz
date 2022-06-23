import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import quizSlice from './quizSlice';
import animalSlice from './animalSlice';
import userSlice from './authSlice';
import rankSlice from './rankSlice';

const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
    animal: animalSlice.reducer,
    user: userSlice.reducer,
    rank: rankSlice.reducer,
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
