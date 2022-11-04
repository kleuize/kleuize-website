import React from "react";
//ctx
import { useAppDispatch } from "../../../store/hooks";
import { QuestionAnswer } from "../../../types";
import { selectAnswer } from "../../../store/quiz/quiz-slice";
//@mui
import { Grid, Card, Typography, CardContent, ButtonBase } from "@mui/material";
import { indigo } from "@mui/material/colors";

const answerStyle = {
  card: {
    border: `1px ${indigo[200]}`,
    "&:hover": {
      cursor: "pointer",
      background: indigo[100],

      border: `1px  ${indigo[900]}`,
    },
  },
  selected: {
    background: indigo[300],
    color: indigo[700],
    border: `1px solid ${indigo[500]}`,
  },
};

interface AnswersProps {
  answers: Array<QuestionAnswer>;
  selectedAnswer: string | unknown;
}

export const Answers = ({ answers, selectedAnswer }: AnswersProps) => {
  const dispatch = useAppDispatch();

  return (
    <Grid container spacing={2} direction="row">
      <Grid item container xs={12} spacing={2}>
        {answers.map((answer, index) => (
          <Grid item xs={12} md={6}>
            <ButtonBase
              key={answer._id}
              sx={{ width: "100%", borderRadius: 2 }}
            >
              <Card
                key={answer._id}
                sx={selectedAnswer === answer._id ? answerStyle.selected : null}
                style={{ width: "100%" }}
                //@ts-ignore
                onClick={() => dispatch(selectAnswer(answer._id))}
                data-testid={`answer-${index + 1}`}
              >
                <CardContent sx={answerStyle.card}>
                  <Typography sx={{ color: "#08104D" }} variant="body1">
                    {answer.text}
                  </Typography>
                </CardContent>
              </Card>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};
