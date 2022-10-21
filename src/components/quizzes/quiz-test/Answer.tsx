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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
   
    width: "100%",
    borderRadius: "12px",
  },
  buttonBase: {
    
  },
  ripple: {
    color: "#fff",
  },
  card: {
    
    "&:hover": {
      cursor: "pointer",
    
    },
  },
  selected: {
  
  },
  cardContent: {
    "&:last-child": {
      
    },
  },
}));

interface AnswersProps {
  answers: Array<QuestionAnswer>;
  selectedAnswer: string | unknown;
}

export const Answers = ({ answers, selectedAnswer }: AnswersProps) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();

  return (
    <>
      {answers.map((answer, index) => (
        <ButtonBase
          key={answer._id}
          style={{ width: "100%" }}
          className={clsx(classes.root, classes.buttonBase)}
          TouchRippleProps={{ classes: { root: classes.ripple } }}
        >
          <Card
            key={answer._id}
            className={clsx(
              classes.root,
              classes.card,
              selectedAnswer === answer._id ? classes.selected : ""
            )}
            //@ts-ignore
            onClick={() => dispatch(selectAnswer(answer._id))}
            data-testid={`answer-${index + 1}`}
          >
            <CardContent className={classes.cardContent}>
              <Typography variant="body1">{answer.text}</Typography>
            </CardContent>
          </Card>
        </ButtonBase>
      ))}
    </>
  );
};
