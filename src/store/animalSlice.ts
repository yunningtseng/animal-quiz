import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestoreApi from '../api/firestore';
import { Animal, SimpleAnimal } from '../types/animal';
import type { AppThunk } from './store';

export interface AnimalState {
  animalList: SimpleAnimal[];
  animal: Animal;
  class: string[];
}

const initialState: AnimalState = {
  animalList: [],
  animal: {} as Animal,
  class: [
    '所有動物',
    '哺乳綱',
    '昆蟲綱',
    '爬蟲綱',
    '唇竹綱',
    '蛛形綱',
    '鳥綱',
    '軟骨魚綱',
    '硬骨魚綱',
  ],
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

export const fetchAnimals = (className: string): AppThunk => async (dispatch, getState) => {
  const list = await firestoreApi.getAnimals(
    className === '所有動物' ? '' : className,
  );
  dispatch(setAnimals(list));
};
export const fetchAnimal = (animalId: string): AppThunk => async (dispatch, getState) => {
  const data = await firestoreApi.getAnimal(animalId);
  dispatch(setAnimal(data));
};

export default animalSlice;
