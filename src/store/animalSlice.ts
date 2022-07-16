import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestoreApi from '../api/firestore';
import { Animal } from '../types/animal';
import type { AppThunk } from './store';

export interface AnimalState {
  animal: Animal;
  showFilterBox: boolean;
  isPhonetic: boolean;
  isGetAnimal: boolean;
}

const initialState: AnimalState = {
  animal: {} as Animal,
  showFilterBox: false,
  isPhonetic: false,
  isGetAnimal: true,
};

const animalSlice = createSlice({
  name: 'animal',
  initialState,
  reducers: {
    setAnimal: (state: AnimalState, action: PayloadAction<Animal>) => {
      state.animal = action.payload;
    },
    setFilter: (state: AnimalState, action: PayloadAction<boolean>) => {
      state.showFilterBox = action.payload;
    },
    setIsPhonetic: (state: AnimalState, action: PayloadAction<boolean>) => {
      state.isPhonetic = action.payload;
    },
    setIsGetAnimal: (state: AnimalState, action: PayloadAction<boolean>) => {
      state.isGetAnimal = action.payload;
    },
    clearState: () => initialState,
  },
});

export const {
  setAnimal,
  setFilter,
  setIsPhonetic,
  setIsGetAnimal,
  clearState,
} = animalSlice.actions;

export const fetchAnimal = (animalId: string): AppThunk => async (dispatch) => {
  const data = await firestoreApi.getAnimal(animalId);
  // - 先確認 data 有沒有 fetch 到動物
  if (data) {
    dispatch(setIsGetAnimal(true));
    dispatch(setAnimal(data));
  } else {
    dispatch(setIsGetAnimal(false));
  }
};

export default animalSlice;
