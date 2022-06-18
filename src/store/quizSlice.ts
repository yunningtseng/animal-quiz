import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import firestoreApi from '../api/firestore';
import { Question } from '../types/question';
import { Response } from '../types/response';
import type { AppThunk } from './store';

export interface QuizState {
  questionList: Question[];
  questionLength: number;
  qId: number;
  question: Question;
  checkAnswer: boolean;
  score: number;
  response: Response;
}

const initialState: QuizState = {
  questionList: [],
  questionLength: 0,
  qId: 0,
  question: {} as Question,
  checkAnswer: true,
  score: 0,
  response: {} as Response,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // - Question[]: 定義 action.payload 的格式
    setQuestionList: (state: QuizState, action: PayloadAction<Question[]>) => {
      state.questionList = action.payload;
      state.questionLength = state.questionList.length;
      [state.question] = state.questionList;
    },
    setResponse: (state: QuizState, action: PayloadAction<Response>) => {
      state.response = action.payload;
    },
    confirmAnswer: (state: QuizState) => {
      state.checkAnswer = false;
      state.score += 30;
    },
    nextQuestion: (state: QuizState) => {
      state.qId += 1;
      state.question = state.questionList[state.qId];
      state.checkAnswer = true;
    },
    endQuiz: (state: QuizState) => {},
  },
});

export const {
  setQuestionList,
  setResponse,
  confirmAnswer,
  nextQuestion,
  endQuiz,
} = quizSlice.actions;

export const fetchQuestionList = (): AppThunk => async (dispatch) => {
  const list = await firestoreApi.getQuestions();
  dispatch(setQuestionList(list));
};

export const fetchResponseAndQuestions = (): AppThunk => async (dispatch) => {
  const response = await firestoreApi.getResponse('FGznKE6b3Tg43HpAvzcc');
  dispatch(setResponse(response));

  // - 篩出某次測驗作答所有的 questionId
  const qIdList = response.data.map((answer) => answer.questionId);

  // - 根據 questionsId，去 query questions 的題目
  const results: Promise<Question>[] = [];
  qIdList.forEach((qId) => results.push(firestoreApi.getQuestion(qId)));
  const questionListLocal = await Promise.all(results);

  dispatch(setQuestionList(questionListLocal));
};

export default quizSlice;
