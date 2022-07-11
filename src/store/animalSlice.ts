import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestoreApi from '../api/firestore';
import { Animal } from '../types/animal';
import type { AppThunk } from './store';

export interface AnimalState {
  animal: Animal;
  showFilterBox: boolean;
  isPhonetic: boolean;
}

const initialState: AnimalState = {
  animal: {} as Animal,
  showFilterBox: false,
  isPhonetic: false,
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
  },
});

export const { setAnimal, setFilter, setIsPhonetic } = animalSlice.actions;

export const fetchAnimal = (animalId: string): AppThunk => async (dispatch, getState) => {
  const data = await firestoreApi.getAnimal(animalId);
  dispatch(setAnimal(data));
};

export default animalSlice;
