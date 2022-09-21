import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Response } from '../types/response';
import { Question } from '../types/question';
import type { AppThunk } from './store';
import quizTimer from '../utils/quizTimer';
import { updateUser } from './authSlice';
import firestoreApi from '../api/firestore';
import { endRoom } from './roomSlice';
import { User } from '../types/user';

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
  navigateToResponseId: string;
}

const initialState: QuizState = {
  qIdList: [],
  question: {} as Question,

  currentAnswer: [],
  response: {} as Response,

  canAnswer: true,
  score: 0,
  correct: false,
  showAlert: false,
  time: 0,
  mode: 'normal',
  quizIsOver: false,
  navigateToResult: false,
  navigateToResponseId: '',
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    initQuiz: (state: QuizState, action: PayloadAction<string>) => {
      const mode = action.payload;

      let time = 0;
      if (mode === 'time-challenge') {
        time = 30;
      } else if (mode === 'competition') {
        time = 30;
      }

      const response: Response = {
        id: '',
        score: 0,
        startTime: new Date().toISOString(),
        totalTime: 0,
        userId: '',
        records: [],
        mode,
      };

      return {
        ...initialState,
        response,
        mode,
        time,
      };
    },

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
      if (state.mode !== 'competition') {
        quizTimer.pause();
      }
      const correctAnswer = state.question.answer;

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

      const record = {
        answer,
        correct,
        questionId: state.question.id,
      };
      state.response.records.push(record);

      if (correct) {
        state.score += 10;
      }
      if (state.qIdList.length === 337) {
        state.quizIsOver = true;
      }
    },
    setQuestion: (state: QuizState, action: PayloadAction<Question>) => {
      state.question = action.payload;
      state.qIdList.push(state.question.id);
      state.canAnswer = true;
      state.currentAnswer = [];
    },

    setTime: (state: QuizState, action: PayloadAction<number>) => {
      state.time = action.payload;
      if (state.time === 0 && state.mode !== 'normal') {
        state.quizIsOver = true;
        quizTimer.pause();
      }
    },
    setNavigateToResponseId: (
      state: QuizState,
      action: PayloadAction<string>,
    ) => {
      state.navigateToResponseId = action.payload;
    },
    clearState: () => initialState,
  },
});

export const {
  initQuiz,
  toggleAnswer,
  confirmAnswer,
  setQuestion,
  setTime,
  clearState,
  setNavigateToResponseId,
} = quizSlice.actions;

export const nextQuestion = (): AppThunk => async (dispatch, getState) => {
  quizTimer.resume();

  const { qIdList } = getState().quiz;
  const max = 337;
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

  const { time } = getState().quiz;

  quizTimer.start(() => {
    dispatch(setTime(quizTimer.time));
  }, time);

  dispatch(nextQuestion());
};

export const endQuiz = (user: User, roomId: string): AppThunk => async (dispatch, getState) => {
  const userId = user.id;

  const {
    response: oldResponse, score, mode, time,
  } = getState().quiz;

  const response = { ...oldResponse, score, userId };

  response.totalTime = time;
  if (mode === 'time-challenge') {
    response.totalTime = 30;
  } else if (mode === 'competition') {
    response.totalTime = 30;
    response.roomId = roomId;
  }

  const responseId = await firestoreApi.setResponse(response);

  response.id = responseId;

  if (mode !== 'competition') {
    const newUser = (await firestoreApi.getUser(userId)) ?? { ...user };

    const quizMode = mode === 'time-challenge' ? 'timeChallenge' : 'normal';

    const bestScore = newUser.bestRecord?.[quizMode]?.score;

    //  就更新 user(最佳成績資訊)
    if (!bestScore || response.score > bestScore) {
      newUser.bestRecord = {
        ...newUser.bestRecord,
        [quizMode]: {
          score: response.score,
          responseId: response.id,
          totalTime: response.totalTime,
          mode: response.mode,
        },
      };
      dispatch(updateUser(newUser));
    }
  }

  quizTimer.reset();

  dispatch(setNavigateToResponseId(responseId));

  if (mode === 'competition') {
    dispatch(endRoom());
  }
};

export default quizSlice;
