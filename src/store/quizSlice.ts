import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Response } from '../types/response';
import firestoreApi from '../api/firestore';
import { Question } from '../types/question';
import type { AppThunk } from './store';
import quizTimer from '../utils/quizTimer';
import { updateUser } from './authSlice';
import { setResponse } from './resultSlice';

export interface QuizState {
  qIdList: string[];
  question: Question;
  canAnswer: boolean;
  score: number;
  response: Response;
  correct: boolean;
  currentAnswer: number[];
  showAlert: boolean;
  time: number;
  mode: string;
  quizIsOver: boolean;
  navigateToResult: boolean;
}

const initialState: QuizState = {
  // > question
  qIdList: [],
  question: {} as Question,
  // > answer
  currentAnswer: [],
  response: {} as Response,
  // > status
  canAnswer: true,
  score: 0,
  correct: false,
  showAlert: false,
  time: 0,
  mode: 'normal',
  quizIsOver: false,
  navigateToResult: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    initQuiz: (state: QuizState, action: PayloadAction<string>) => {
      const mode = action.payload;

      let time = 0;
      if (mode === 'time-challenge') {
        time = 15;
      }

      // - 創一個 response，裡面有 responseId userName startTime
      const response: Response = {
        id: '',
        score: 0,
        startTime: new Date().toISOString(),
        totalTime: 0,
        userId: '',
        records: [],
        mode,
      };
      // * return QuizState 會去覆蓋輸出整個 state
      return {
        ...initialState,
        response,
        mode,
        time,
      };
    },
    // - toggle answer
    toggleAnswer: (state: QuizState, action: PayloadAction<number>) => {
      if (!state.canAnswer) return;

      const toggleAnswer = action.payload;
      const { type } = state.question;
      if (type === 'multiple') {
        const index = state.currentAnswer.indexOf(toggleAnswer);
        if (index !== -1) {
          state.currentAnswer.splice(index, 1);
        } else {
          state.currentAnswer.push(toggleAnswer);
        }
      } else {
        state.currentAnswer = [toggleAnswer];
      }
      state.showAlert = false;
    },
    confirmAnswer: (state: QuizState) => {
      const answer = state.currentAnswer;
      if (answer.length === 0) {
        state.showAlert = true;
        return;
      }

      state.canAnswer = false;
      quizTimer.pause();
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

      // - 計算分數，呈現對錯
      if (correct) {
        state.score += 10;
      }
      if (state.qIdList.length === 19) {
        state.quizIsOver = true;
      }
    },
    setQuestion: (state: QuizState, action: PayloadAction<Question>) => {
      state.question = action.payload;
      state.qIdList.push(state.question.id);
      state.canAnswer = true;
      state.currentAnswer = [];
    },
    // - 設置當前顯示的時間
    setTime: (state: QuizState, action: PayloadAction<number>) => {
      state.time = action.payload;
      if (state.time === 0 && state.mode === 'time-challenge') {
        state.quizIsOver = true;
        quizTimer.pause();
      }
    },
    setNavigateToResult: (state: QuizState) => {
      state.navigateToResult = true;
    },
    clearState: () => initialState,
    setState: (state: QuizState, action: PayloadAction<QuizState>) => action.payload,
  },
});

export const {
  initQuiz,
  toggleAnswer,
  confirmAnswer,
  setQuestion,
  setTime,
  setNavigateToResult,
  clearState,
  setState,
} = quizSlice.actions;

export const nextQuestion = (): AppThunk => async (dispatch, getState) => {
  quizTimer.resume();

  const { qIdList } = getState().quiz;
  const max = 19;
  let newQId: string | undefined;
  const demoList = [1, 2, 7, 15, 16, 17, 18, 19, 3, 4, 5];
  while (qIdList.length !== max) {
    const numNumber = demoList[qIdList.length];
    // const numNumber = Math.floor(Math.random() * max + 1);
    const numNumberStr = String(numNumber).padStart(4, '0');
    if (!qIdList.includes(numNumberStr)) {
      newQId = numNumberStr;
      break;
    }
  }
  if (newQId) {
    const question = await firestoreApi.getQuestion(newQId);
    dispatch(setQuestion(question));
  }
};

export const startQuiz = (mode: string): AppThunk => (dispatch, getState) => {
  dispatch(initQuiz(mode));

  const startTime = getState().quiz.time;

  // * 開始 quizTimer 來持續改變當前顯示的 time
  // * 第一個參數的匿名 function 就是 onTimeChange，每秒會去執行
  quizTimer.start(() => {
    // * 從 quizTimer 提取當前最新的時間並 setTime
    dispatch(setTime(quizTimer.time));
  }, startTime);

  // * 載入第一題
  dispatch(nextQuestion());
};

export const endQuiz = (): AppThunk => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  const {
    response: oldResponse, score, mode, time,
  } = getState().quiz;

  const response = { ...oldResponse, score, userId };

  if (mode === 'time-challenge') {
    response.totalTime = 15;
  } else {
    response.totalTime = time;
  }

  const responseId = await firestoreApi.setResponse(response);
  response.id = responseId;
  dispatch(setResponse(response));

  // - 從 firestore 取最新的 user 資料
  let user = await firestoreApi.getUser(userId);
  // - 如果沒有則讀 store 的資料
  if (!user) {
    user = getState().auth.user;
  }

  // - 若這次的 response 分數比個人最佳成績高，或還沒有個人最佳成績，
  //  就更新 user(最佳成績資訊)
  if (!user.bestScore || response.score > user.bestScore) {
    const newUser = { ...user };
    newUser.bestScore = response.score;
    newUser.bestScoreResponseId = response.id;
    newUser.totalTime = response.totalTime;
    newUser.mode = response.mode;

    dispatch(updateUser(newUser));
  }

  quizTimer.reset();
  dispatch(setNavigateToResult());
};

export default quizSlice;
