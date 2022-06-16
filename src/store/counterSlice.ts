import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import counterApi from '../api/counterApi';
import type { AppThunk } from './store';

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: CounterState) => {
      state.value += 1;
    },
    decrement: (state: CounterState) => {
      state.value -= 1;
    },
    incrementByAmount: (state: CounterState, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const incrementIfOdd = (amount: number): AppThunk => (dispatch, getState) => {
  const currentValue = getState().counter.value;

  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
    dispatch(incrementByAmount(amount));
  }
};

export const incrementAsync = (amount: number): AppThunk => async (dispatch, getState) => {
  // const response = await counterApi.fetchCount(amount);
  // dispatch(incrementByAmount(response.data));
};

export default counterSlice;
