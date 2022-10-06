import axios, { AxiosError, AxiosResponse } from "axios";
import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export interface CreateLessonState {
  lessonTitle: string;
  lessonIndex: number;
  lessonId: string;
  errorMessage: any;
}

const initialState: CreateLessonState = {
  lessonTitle: "",
  lessonIndex: 0,
  lessonId: "",
  errorMessage: "",
};

export const createLessonSlice = createSlice({
  name: "create-lesson",
  initialState,
  reducers: {
    changeLessonTitle: (state, action: PayloadAction<string>) => {
      state.lessonTitle = action.payload;
    },
    createLessonSuccess: (state, action: PayloadAction<string>) => {
      state.errorMessage = "";
      state.lessonId = action.payload;
    },
    createLessonFail: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { changeLessonTitle, createLessonFail, createLessonSuccess } =
  createLessonSlice.actions;

export const selectCreateLesson = (state: RootState) => state.createLesson;

// export const createLesson = (slug, insturctorId): AppThunk => async (dispatch, getState) => {
  

//   const { lessonTitle } = selectCreateLesson(getState());
//   try {
//     const res: AxiosResponse = await axios.post(
//       //@ts-ignore
//       `/api/course/lesson/${slug}/${course.instructor._id}`,
//       { lessonTitle }
//     );
//     dispatch(createLessonSuccess(res.data));
//     router.push(`/instructor/course/view/${slug}`);
//   } catch (error) {
//     const { response } = error as AxiosError;
//     const errorMessage = response?.data || "Something unexpected happend!";
//     //@ts-ignore
//     dispatch(createLessonFail(errorMessage));
//   }
// };

export default createLessonSlice.reducer;
