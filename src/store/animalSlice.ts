import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestoreApi from '../api/firestore';
import { Animal, SimpleAnimal } from '../types/animal';
import type { AppThunk } from './store';

export interface AnimalState {
  animalList: SimpleAnimal[];
  animal: Animal;
}

const initialState: AnimalState = {
  animalList: [],
  animal: {} as Animal,
};

const animalSlice = createSlice({
  name: 'animal',
  initialState,
  reducers: {
    setAnimals: (state: AnimalState, action: PayloadAction<SimpleAnimal[]>) => {
      state.animalList = action.payload;
    },
    setAnimal: (state: AnimalState, action: PayloadAction<Animal>) => {
      state.animal = action.payload;
    },
  },
});

export const { setAnimals, setAnimal } = animalSlice.actions;

export const fetchAnimals = (): AppThunk => async (dispatch, getState) => {
  const list = await firestoreApi.getAnimals();
  dispatch(setAnimals(list));
};
export const fetchAnimal = (animalId: string): AppThunk => async (dispatch, getState) => {
  const data = await firestoreApi.getAnimal(animalId);
  dispatch(setAnimal(data));
};

export default animalSlice;
