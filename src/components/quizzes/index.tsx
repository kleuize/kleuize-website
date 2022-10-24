import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { CardBox } from "./CardBox";
import { resetState, getQuizByCode } from "../../store/quiz/quiz-slice";
import { Loading } from "./Loading";
import { QuizIntro } from "./QuizIntro";
import { QuizTest } from "./quiz-test/index";
import { QuizResult } from "./QuizResult";
import { useRouter } from "next/router";

const Quiz = ({slug, quizId}: any) => {
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
    return <Loading />;
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
      <CardBox>
        Test 
        <QuizResult score={quizResult} />
      </CardBox>
    );
  }

  return (
    <CardBox>
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
    </CardBox>
  );
};

export default Quiz;