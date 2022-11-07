import React, { createContext, useContext, useState, useEffect } from "react";
//next
import { useRouter } from "next/router";
//3rd
import axios from "axios";
import { useAppSelector } from "../store/hooks";

type Children = {
  children?: React.ReactNode;
};

export const CompletedQuizContext = createContext<any | null>(null);

export const CompletedQuizContextProvider: React.FC<Children> = ({
  children,
}) => {
  const [clickedQuizIndex, setClickedQuizIndex] = useState(-1);
  const [completedQuiz, setCompletedQuiz] = useState([]);
  const [course, setCourse] = useState<any>({ lessons: [] });
  const [updateState, setUpdateState] = useState<boolean>(false);

  const { quizDetails } = useAppSelector((state) => state.quiz);

  console.log("context", quizDetails);
  console.log("context", clickedQuizIndex);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedQuiz();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const loadCompletedQuiz = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    console.log("COMPLETED LESSONS => ", data);
    setCompletedQuiz(data);
  };

  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      quizId: quizDetails._id,
      //   lessonId: course.lessons[clickedQuizIndex]._id,
    });
    console.log(data);
    //@ts-ignore
    setCompletedQuiz([...completedQuiz, quizDetails._id]);
  };

  const values = {
    clickedQuizIndex,
    completedQuiz,
    updateState,
    setCompletedQuiz,
    setClickedQuizIndex,
    setUpdateState,
    markCompleted,
  };

  return (
    <CompletedQuizContext.Provider value={values}>
      {children}
    </CompletedQuizContext.Provider>
  );
};

export const useCompletedQuiz = () => useContext(CompletedQuizContext);
