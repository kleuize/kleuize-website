import React, { useReducer, createContext, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";

const firstAnswerID = "123123";

const initialState = {
    quiz: null,
};

export const UserContext = createContext<any | null>(null);

const createQuizReducer = (state: any, action: any) => {
  switch (action.type) {
    case "ADD_QUESTION":
      return { ...state, quiz: action.payload };
    case "RESET_STATE":
      return { quiz: initialState };
    case "REMOVE_QUESTION":
      return { ...state, quiz: null };
    case "CHANGE_TITLE":
      return { ...state, quiz: action.payload };
    case "CHANGE_DESCRIPTION":
      return { ...state, quiz: action.payload };
    case "CHANGE_QUESTION":
      return { ...state, quiz: action.payload };
    case "CHANGE_ANSWER":
      return { ...state, quiz: action.payload };
    case "CHANGE_PAGE":
      return { ...state, quiz: action.payload };
    case "SET_SELECTED_ANSWER":
      return { ...state, quiz: action.payload };
    case "VALIDATE_FORM":
      return { ...state, quiz: null };
    case "SET_LOADING":
      return { ...state, quiz: action.payload };
    case "CREATE_QUIZ_SUCCESS":
      return { ...state };
  }
};
