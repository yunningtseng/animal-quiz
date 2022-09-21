import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Response } from '../types/response';
import { Question } from '../types/question';
import type { AppThunk } from './store';
import firestoreApi from '../api/firestore';

export interface ResultState {
  questionList: Question[];
  response: Response;
  responses: Response[];
  resultState: string;
  showResultDialog: boolean;
  isLoading: boolean;
}

const initialState: ResultState = {
  questionList: [],
  response: {} as Response,
  responses: [],
  resultState: 'initial',
  showResultDialog: true,
  isLoading: true,
};

const resultSlice = createSlice({
  name: 'result',
  initialState,
  reducers: {
    setQuestionList: (
      state: ResultState,
      action: PayloadAction<Question[]>,
    ) => {
      state.questionList = action.payload;
    },
    setResponse: (state: ResultState, action: PayloadAction<Response>) => ({
      ...initialState,
      response: action.payload,
    }),
    setResponses: (state: ResultState, action: PayloadAction<Response[]>) => {
      state.responses = action.payload;
    },
    clearState: () => initialState,
    setResultDialog: (state: ResultState, action: PayloadAction<boolean>) => {
      state.showResultDialog = action.payload;
    },
    setIsLoading: (state: ResultState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setQuestionList,
  setResponse,
  setResponses,
  clearState,
  setResultDialog,
  setIsLoading,
} = resultSlice.actions;

export const fetchResponseAndQuestions = (responseId: string): AppThunk => async (dispatch) => {
  dispatch(clearState());

  const response = await firestoreApi.getResponse(responseId);
  dispatch(setResponse(response));

  const qIdList = response.records.map((answer) => answer.questionId);

  const list = await firestoreApi.getQuestions(qIdList);

  dispatch(setQuestionList(list));
  dispatch(setIsLoading(false));
};

export const fetchResponses = (userId: string): AppThunk => async (dispatch) => {
  dispatch(clearState());
  const data = await firestoreApi.getResponses(userId);

  dispatch(setResponses(data));
  dispatch(setIsLoading(false));
};

export default resultSlice;
