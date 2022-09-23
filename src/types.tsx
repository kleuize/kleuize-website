export interface ICreateCourseProps {
  name?: string;
  description?: string;
  price?: number;
  uploading?: boolean;
  paid?: boolean;
  category?: string;
  loading?: boolean;
}

// CreateQuiz
export interface ChangeAnswer {
  name: string;
  value: string;
}
export interface QuestionAnswer {
  text: string;
}
export interface Question {
  content: string;
  answers: [QuestionAnswer, QuestionAnswer, QuestionAnswer, QuestionAnswer];
}
export interface CreateQuizState {
  title: string;
  description: string;
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
  id: string;
  title: string;
  description?: string;
  code: string;
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

export interface ICourseViewProps {
  _id?: string;
  image?: any;
  name?: string;
  category?: string;
  lessons?: any;
  published?: boolean;
  description?: string;
  instructor?: any;
}