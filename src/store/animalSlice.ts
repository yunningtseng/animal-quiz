import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestoreApi from '../api/firestore';
import { Animal } from '../types/animal';
import type { AppThunk } from './store';

export interface AnimalState {
  animal: Animal;
  showFilterBox: boolean;
  isPhonetic: boolean;
  animalNotFound: boolean;
  isLoading: boolean;
}

const initialState: AnimalState = {
  animal: {} as Animal,
  showFilterBox: false,
  isPhonetic: false,
  animalNotFound: false,
  isLoading: false,
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
    setAnimalNotFound: (state: AnimalState, action: PayloadAction<boolean>) => {
      state.animalNotFound = action.payload;
    },
    setIsLoading: (state: AnimalState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearState(state: AnimalState) {
      return { ...initialState, isPhonetic: state.isPhonetic };
    },
  },
});

export const {
  setAnimal,
  setFilter,
  setIsPhonetic,
  setAnimalNotFound,
  setIsLoading,
  clearState,
} = animalSlice.actions;

export const fetchAnimal = (animalId: string): AppThunk => async (dispatch) => {
  dispatch(clearState());
  dispatch(setIsLoading(true));
  const data = await firestoreApi.getAnimal(animalId);

  if (data) {
    dispatch(setAnimalNotFound(false));
    dispatch(setAnimal(data));
  } else {
    dispatch(setAnimalNotFound(true));
  }
  dispatch(setIsLoading(false));
};

export default animalSlice;
