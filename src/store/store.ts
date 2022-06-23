import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import quizSlice from './quizSlice';
import animalSlice from './animalSlice';

const store = configureStore({
  reducer: {
    quiz: quizSlice.reducer,
    animal: animalSlice.reducer,
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
