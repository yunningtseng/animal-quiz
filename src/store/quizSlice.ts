import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Response } from '../types/response';
import firestoreApi from '../api/firestore';
import { Question } from '../types/question';

import type { AppThunk } from './store';

export interface QuizState {
  questionList: Question[];
  questionLength: number;
  qId: number;
  question: Question;
  checkAnswer: boolean;
  score: number;
  response: Response;
  correct: boolean;
  currentAnswer: number[];
}

const initialState: QuizState = {
  questionList: [],
  questionLength: 0,
  qId: 0,
  question: {} as Question,
  checkAnswer: true,
  score: 0,
  response: {} as Response,
  correct: false,
  currentAnswer: [],
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
    startQuiz: (state: QuizState) => {
      // - 創一個 response，裡面有 responseId userName startTime
      const response: Response = {
        id: '',
        score: 0,
        startTime: new Date().toISOString(),
        totalTime: 0,
        userName: 'ynt',
        records: [],
      };
      state.response = response;
    },
    // - toggle answer
    toggleAnswer: (state: QuizState, action: PayloadAction<number>) => {
      const toggleAnswer = action.payload;
      const index = state.currentAnswer.indexOf(toggleAnswer);
      if (index !== -1) {
        state.currentAnswer.splice(index, 1);
      } else {
        state.currentAnswer.push(toggleAnswer);
      }
    },
    confirmAnswer: (state: QuizState) => {
      const answer = state.currentAnswer;
      // TODO 檢查漏答，計時器暫停再打開
      // if (answer.length === 0) {
      // }
      const correctAnswer = state.question.answer;
      // - 判斷回答對錯
      let correct = answer.length === correctAnswer.length;
      if (correct) {
        for (let i = 0; i < correctAnswer.length; i += 1) {
          if (!answer.includes(correctAnswer[i])) {
            correct = false;
            break;
          }
        }
      }
      state.correct = correct;

      // - 存 record
      const record = {
        answer,
        correct,
        questionId: state.question.id,
      };
      state.response.records.push(record);

      // - 計算分數
      state.checkAnswer = false;
      if (correct) {
        state.score += 10;
      }
    },
    nextQuestion: (state: QuizState) => {
      state.qId += 1;
      state.question = state.questionList[state.qId];
      state.checkAnswer = true;
      state.currentAnswer = [];
    },
    setResponseScoreAndTotalTime: (state: QuizState) => {
      // TODO score totalTime
      state.response.score = state.score;
    },
    // - 遊戲結束清除紀錄
    clearAnswer: (state: QuizState) => {
      state.response.score = 0;
      state.score = 0;
      state.checkAnswer = true;
      state.currentAnswer = [];
    },
  },
});

export const {
  setQuestionList,
  setResponse,
  startQuiz,
  toggleAnswer,
  confirmAnswer,
  nextQuestion,
  setResponseScoreAndTotalTime,
  clearAnswer,
} = quizSlice.actions;

export const fetchQuestionList = (): AppThunk => async (dispatch) => {
  const list = await firestoreApi.getQuestions();
  dispatch(setQuestionList(list));
  dispatch(startQuiz());
};

export const fetchResponseAndQuestions = (): AppThunk => async (dispatch, getState) => {
  // const response = await firestoreApi.getResponse('FGznKE6b3Tg43HpAvzcc');
  // dispatch(setResponse(response));
  const { response } = getState().quiz;

  // - 篩出某次測驗作答所有的 questionId
  const qIdList = response.records.map((answer) => answer.questionId);

  // - 根據 questionsId，去 query questions 的題目
  const list = await firestoreApi.getQuestions(qIdList);

  dispatch(setQuestionList(list));
};
export const endQuiz = (): AppThunk => async (dispatch, getState) => {
  dispatch(setResponseScoreAndTotalTime());
  const { response } = getState().quiz;
  await firestoreApi.setResponse(response);
};

export default quizSlice;
