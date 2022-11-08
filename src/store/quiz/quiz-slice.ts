import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { useCompletedQuiz } from "../../context/CompletedQuiz";

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
  _id: string;
  quizTitle: string;
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
    resetQuiz: (state) => {
      state.quizStarted = false;
    },
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
      if (state.questionIndex + 1 < state.quizDetails.questions?.length) {
        state.questionIndex++;
      }
    },
    previousQuestion: (state) => {
      if (state.questionIndex + 1 <= state.quizDetails.questions?.length) {
        state.questionIndex--;
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
  previousQuestion,
  selectAnswer,
  setSubmitting,
  submitFail,
  submitSuccess,
  resetQuiz,
} = quizSlice.actions;

export const selectQuiz = (state: RootState) => state.quiz;

export const getQuizByCode =
  (slug: any, quizId: any): AppThunk =>
  async (dispatch) => {
    try {
      const res: AxiosResponse = await axios.get(`/api/user/lessons/${slug}/`);
      const course = res.data;
      const Alllesson = course.lessons;
      console.log(Alllesson);
      Alllesson.forEach((element: any) =>
        element.quiz
          .filter((id: any) => id._id === quizId)
          .map((singleQuiz: QuizDetail) => dispatch(setQuiz(singleQuiz)))
      );
    } catch (error) {
      const { response } = error as AxiosError;

      const errorMessage = response?.data || "Something unexpected happend!";
      //@ts-ignore
      dispatch(getQuizFail(errorMessage));
    }
  };

export const getQuizResult = (course: any): AppThunk => async (dispatch, getState) => {
  
  dispatch(setSubmitting());
  //@ts-ignore
  const { quizDetails, selectedAnswers } = selectQuiz(getState());

  const { questions } = quizDetails;
  let correctAnswersCount = 0;

  questions.forEach((question: any, questionIndex: number) => {
    // We check if the selected answer equals one of the answers, if yes, we increment the correctAnswers count
    const { answers } = question;
    for (let index = 0; index < answers.length; index++) {
      const answer: any = answers[index];
      const isSelected = selectedAnswers[questionIndex] === answer._id;

      if (isSelected) {
        // If the selected answer is correct, we increase the count
        if (answer.isCorrect) {
          correctAnswersCount++;
        }
        break;
      }
    }
  });
  const score = Math.round((100 * correctAnswersCount) / questions.length);

  try {
    const res = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      quizId: quizDetails._id,
      score,
    });

    console.log(res.data)
    dispatch(submitSuccess(score));
  } catch (error) {
    const { response } = error as AxiosError;

    const errorMessage = response?.data || "Something unexpected happend!";
    //@ts-ignore
    dispatch(submitFail(errorMessage));
  }
};

export default quizSlice.reducer;
