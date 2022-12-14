import { NextPage } from "next";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

export interface ICreateCourseProps {
  name?: string;
  description?: string;
  slug?: string;
  price?: number;
  uploading?: boolean;
  paid?: boolean;
  category?: string;
  loading?: boolean;
  lessons?: any[];
}

// CreateQuiz
export interface ChangeAnswer {
  name: string;
  value: string;
}
export interface QuestionAnswer {
  _id?: string;
  text: string;
}
export interface Question {
  _id?: string;
  content: string;
  answers: [QuestionAnswer, QuestionAnswer, QuestionAnswer, QuestionAnswer];
}
export interface CreateQuizState {
  title: string;
  questionIndex: number;
  questions: Array<Question>;
  selectedAnswers: Array<string>;
  isLoading: boolean;
  isValid: boolean;
  quizId: string;
  errorMessage: string;
}

// Quiz
export interface Quiz {
  title: string;
  questions: Array<Question>;
}

export interface QuizState {
  quiz: Quiz;
  questionIndex: number;
  selectedAnswers: Array<string>;
  isLoading: boolean;
  quizStarted: boolean;
  quizTimer: string;
  isSubmitting: boolean;
  quizResult: number;
  errorMessage: string;
}

export interface ILessonWiewProps {
  lessonTitle: string;
  quiz: Quiz;
}
export interface ICourseViewProps {
  _id?: string;
  image?: any;
  name?: string;
  category?: string;
  lessons?: any;
  published?: boolean;
  price?: any;
  slug?: string;
  description?: string;
  instructor?: any;
  isLoading?: boolean;
  errorMessage?: string;
}
