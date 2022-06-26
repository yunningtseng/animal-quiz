import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Response } from '../types/response';
import firestoreApi from '../api/firestore';
import { Question } from '../types/question';
import type { AppThunk } from './store';
import quizTimer from '../utils/quizTimer';

export interface QuizState {
  questionList: Question[];
  qIdList: string[];
  question: Question;
  checkAnswer: boolean;
  score: number;
  response: Response;
  responses: Response[];
  correct: boolean;
  currentAnswer: number[];
  showAlert: boolean;
  time: number;
  mode: string;
  quizIsOver: boolean;
}

const initialState: QuizState = {
  // > question
  questionList: [],
  qIdList: [],
  question: {} as Question,
  // > answer
  currentAnswer: [],
  response: {} as Response,
  responses: [],
  // > status
  checkAnswer: true,
  score: 0,
  correct: false,
  showAlert: false,
  time: 0,
  mode: 'normal',
  quizIsOver: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    // - Question[]: 定義 action.payload 的格式
    setQuestionList: (state: QuizState, action: PayloadAction<Question[]>) => {
      state.questionList = action.payload;
    },
    setResponse: (state: QuizState, action: PayloadAction<Response>) => {
      state.response = action.payload;
    },
    initQuiz: (state: QuizState, action: PayloadAction<string>) => {
      const mode = action.payload;

      let time = 0;
      if (mode === 'time-challenge') {
        time = 30;
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
      const toggleAnswer = action.payload;
      const index = state.currentAnswer.indexOf(toggleAnswer);
      if (index !== -1) {
        state.currentAnswer.splice(index, 1);
      } else {
        state.currentAnswer.push(toggleAnswer);
      }
      state.showAlert = false;
    },
    confirmAnswer: (state: QuizState) => {
      const answer = state.currentAnswer;
      if (answer.length === 0) {
        state.showAlert = true;
        return;
      }
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

      // - 計算分數
      state.checkAnswer = false;
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
      state.checkAnswer = true;
      state.currentAnswer = [];
    },
    setResponseScoreAndTotalTime: (
      state: QuizState,
      action: PayloadAction<string>,
    ) => {
      const userId = action.payload;
      state.response.score = state.score;
      state.response.userId = userId;
      if (state.mode === 'time-challenge') {
        state.response.totalTime = 30;
      } else {
        state.response.totalTime = state.time;
      }
    },
    // - 遊戲結束清除紀錄
    clearAnswer: (state: QuizState) => {
      state.response.score = 0;
      state.score = 0;
      state.checkAnswer = true;
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
    // TODO
    // - 儲存玩家所有作答紀錄
    setResponses: (state: QuizState, action: PayloadAction<Response[]>) => {
      state.responses = action.payload;
    },
  },
});

export const {
  setQuestionList,
  setResponse,
  initQuiz,
  toggleAnswer,
  confirmAnswer,
  setQuestion,
  setResponseScoreAndTotalTime,
  clearAnswer,
  setTime,
  setResponses,
} = quizSlice.actions;

export const nextQuestion = (): AppThunk => async (dispatch, getState) => {
  quizTimer.resume();

  const { qIdList } = getState().quiz;
  const max = 19;
  let newQId: string | undefined;
  while (qIdList.length !== max) {
    const numNumber = Math.floor(Math.random() * max + 1);
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

export const fetchResponseAndQuestions = (): AppThunk => async (dispatch, getState) => {
  const { response } = getState().quiz;

  // - 篩出某次測驗作答所有的 questionId
  const qIdList = response.records.map((answer) => answer.questionId);

  // - 根據 questionsId，去 query questions 的題目
  const list = await firestoreApi.getQuestions(qIdList);

  dispatch(setQuestionList(list));
};
export const endQuiz = (): AppThunk => async (dispatch, getState) => {
  const userId = getState().auth.user.id;
  dispatch(setResponseScoreAndTotalTime(userId));
  const { response } = getState().quiz;
  await firestoreApi.setResponse(response);
  // TODO 從 firestore 的 users 取個人最佳紀錄
  await firestoreApi.getUser(userId);
  // TODO 比較這個 response 跟最佳紀錄
  // if(){

  // }

  // TODO 若這個 response 分數較高，則 set 新 users 內的資料
  quizTimer.reset();
  dispatch(setTime(0));
};
// TODO
export const fetchResponses = (userId: string): AppThunk => async (dispatch) => {
  const data = await firestoreApi.getResponses(userId);
  dispatch(setResponses(data));
};

export default quizSlice;
