import React from "react";
import clsx from "clsx";
import { useAppDispatch } from "../../../store/hooks";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { QuestionAnswer } from "../../../types";
import { selectAnswer } from "../../../store/quiz/quiz-slice";

import { red, teal, indigo } from "@mui/material/colors";

const dw = 300;

const answerStyle = {
  root: {
    width: "100%",
    color: red[50],
    borderRadius: "12px",
    marginBottom: 2,
  },
  buttonBase: {
    marginBottom: 2,
  },
  ripple: {
    color: "#fff",
  },
  card: {
    border: `1px solid ${red[200]}`,
    "&:hover": {
      cursor: "pointer",
      background: teal[500],
      color: red[400],
      border: `1px solid ${teal[900]}`,
    },
  },
  selected: {
    background: indigo[300],
    color: indigo[700],
    border: `1px solid ${indigo[900]}`,
  },
};

interface AnswersProps {
  answers: Array<QuestionAnswer>;
  selectedAnswer: string | unknown;
}

export const Answers = ({ answers, selectedAnswer }: AnswersProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {answers.map((answer, index) => (
        <ButtonBase
          key={answer._id}
          style={{ width: "100%" }}
          sx={answerStyle.root}
          //   TouchRippleProps={{ classes: {answerStyle.ripple } }}
        >
          <Card
            style={{ width: "100%" }}
            key={answer._id}
            sx={selectedAnswer === answer._id ? answerStyle.selected : null}
            //@ts-ignore
            onClick={() => dispatch(selectAnswer(answer._id))}
            data-testid={`answer-${index + 1}`}
          >
            <CardContent sx={answerStyle.card}>
              <Typography variant="body1">{answer.text}</Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      ))}
    </>
  );
};
