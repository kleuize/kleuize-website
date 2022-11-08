import React, { createContext, useContext, useState, useEffect } from "react";
//next
import { useRouter } from "next/router";
//3rd
import axios from "axios";

type Children = {
  children?: React.ReactNode;
};

export const CompletedQuizContext = createContext<any | null>(null);

export const CompletedQuizContextProvider: React.FC<Children> = ({
  children,
}) => {
  const [completedQuiz, setCompletedQuiz] = useState([]);
  const [course, setCourse] = useState<any>();

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

  const values = {
    course,
  };

  return (
    <CompletedQuizContext.Provider value={values}>
      {children}
    </CompletedQuizContext.Provider>
  );
};

export const useCompletedQuiz = () => useContext(CompletedQuizContext);
