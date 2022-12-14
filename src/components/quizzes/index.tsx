import React, { useEffect } from "react";
//hooks
import { useAppSelector, useAppDispatch } from "../../store/hooks";
//ctx
import { resetState, getQuizByCode } from "../../store/quiz/quiz-slice";
import { QuizIntro } from "./QuizIntro";
import { QuizTest } from "./quiz-test/index";
import { QuizResult } from "./QuizResult";
//@mui
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
//components
import { CardBox } from "./CardBox";
import { LoadingSpinner } from "../LoadingSpinner";

const Quizzes = ({ slug, quizId }: any) => {
  const {
    quizDetails,
    isLoading,
    isSubmitting,
    quizStarted,
    quizResult,
    errorMessage,
  } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  // Getting quiz
  useEffect(() => {
    dispatch(resetState());
    //@ts-ignore
    dispatch(getQuizByCode(slug, quizId));
  }, []);

  if (isLoading || isSubmitting) {
    return (
      <Box sx={{ width: "100%", height: "100vh", textAlign: "center" }}>
        <LoadingSpinner />
      </Box>
    );
  }

  if (errorMessage) {
    return (
      <CardBox>
        <Typography color="secondary" variant="h5" component="div" mb={3}>
          {errorMessage}
        </Typography>
        {errorMessage === "Quiz not found!" && (
          <Typography component="div">
            Wrong link or quiz has been deleted!
          </Typography>
        )}
      </CardBox>
    );
  }

  if (quizResult >= 0) {
    return (
      <Box sx={{ width: "100%", height: "100vh", textAlign: "center" }}>
        <QuizResult score={quizResult} />
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100vh", textAlign: "center" }}>
      <Typography color="secondary" variant="h4" component="div" mb={1}>
        {quizDetails.quizTitle}
      </Typography>
      <Box mb={3}>
        {!quizStarted && (
          <Fade
            in={!quizStarted}
            style={{ transitionDelay: "100ms" }}
            mountOnEnter
            unmountOnExit
          >
            <div>
              <QuizIntro description={quizDetails.quizTitle} />
            </div>
          </Fade>
        )}

        <Fade
          in={quizStarted}
          style={{ transitionDelay: "400ms" }}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <QuizTest />
          </div>
        </Fade>
      </Box>
    </Box>
  );
};

export default Quizzes;
