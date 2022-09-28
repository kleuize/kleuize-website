import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";

export interface QuestionAnswer {
  id: string;
  text: string;
}

export interface Question {
  id?: string;
  content: string;
  answers: [QuestionAnswer, QuestionAnswer, QuestionAnswer, QuestionAnswer];
}
// Quiz
export interface QuizDetail {
  id: string;
  title: string;
  questions: Array<Question>;
}

export interface QuizState {
  quizDetails: QuizDetail;
  questionIndex: number;
  selectedAnswers: Array<string>;
  isLoading: boolean;
  quizStarted: boolean;
  quizTimer: string;
  isSubmitting: boolean;
  quizResult: number;
  errorMessage: any;
}

const initialState: QuizState = {
  quizDetails: {} as QuizDetail,
  questionIndex: 0,
  selectedAnswers: [],
  isLoading: true,
  quizStarted: false,
  quizTimer: "00:00",
  isSubmitting: false,
  quizResult: -1, // After getting the result from backend, it becomes 0 or higher
  errorMessage: "",
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetState: () => initialState,
    setQuiz: (state, action: PayloadAction<QuizDetail>) => {
      state.quizDetails = { ...action.payload };
      state.isLoading = false;
    },
    getQuizFail: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isLoading = false;
    },
    startQuiz: (state) => {
      state.quizStarted = true;
    },
    changeTimer: (state, action: PayloadAction<string>) => {
      state.quizTimer = action.payload;
    },
    nextQuestion: (state) => {
      if (state.questionIndex + 1 < state.quizDetails.questions.length) {
        state.questionIndex++;
      }
    },
    selectAnswer: (state, action: PayloadAction<string>) => {
      state.selectedAnswers[state.questionIndex] = action.payload;
    },
    setSubmitting: (state) => {
      state.isSubmitting = true;
    },
    submitFail: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
      state.isSubmitting = false;
    },
    submitSuccess: (state, action: PayloadAction<number>) => {
      state.quizResult = action.payload;
      state.isSubmitting = false;
    },
  },
});

export const {
  changeTimer,
  setQuiz,
  getQuizFail,
  resetState,
  startQuiz,
  nextQuestion,
  selectAnswer,
  setSubmitting,
  submitFail,
  submitSuccess,
} = quizSlice.actions;

export const selectQuiz = (state: RootState) => state.quiz;

export const getQuizByCode =
  (quizCode: string): AppThunk =>
  async (dispatch) => {
    try {
      const res: AxiosResponse = await axios.get(`quizzes/${quizCode}`);

      dispatch(setQuiz(res.data));
    } catch (error) {
      const { response } = error as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";
      //@ts-ignore
      dispatch(getQuizFail(errorMessage));
    }
  };

// export const getQuizResult = (): AppThunk => async (dispatch, getState) => {
//   dispatch(setSubmitting());

//   const { quiz, selectedAnswers } = selectQuiz(getState());

//   try {
//     const res: AxiosResponse = await axios.post(`quizzes/result/${quiz.code}`, {
//       selectedAnswers,
//     });

//     dispatch(submitSuccess(res.data));
//   } catch (error) {
//     const { response } = error as AxiosError;

//     const errorMessage = response?.data || "Something unexpected happend!";
//     //@ts-ignore
//     dispatch(submitFail(errorMessage));
//   }
// };

export default quizSlice.reducer;
