import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import createQuiz from "./create-quiz/create-quiz-slice";
import quiz from "./quiz/quiz-slice";

export const store = configureStore({
  reducer: {
    createQuiz,
    quiz,
  },
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
