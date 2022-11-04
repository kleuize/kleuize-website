import React, { useState } from "react";
//next
import Image from "next/image";
//ctx
import { store } from "../../store/store";
import { startQuiz } from "../../store/quiz/quiz-slice";
//@mui
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
//img
import ligthBulbImage from "../../../public/quiz-light-bulb.png";

interface QuizIntroProps {
  description?: string | undefined;
}

export const QuizIntro: React.FC<QuizIntroProps> = ({ description }) => {
  return (
    <Stack display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Image
        data-testid="light-bulb-image"
        src={ligthBulbImage}
        alt="light-bulb-image"
        height="190px"
        width="190px"
        style={{
          objectFit: "cover",
        }}
      />
      <Typography
        sx={{ marginBottom: 5, marginTop: 5 }}
        data-testid="quiz-description"
      >
        {description || "Bu test açıklama içermiyor."}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ width: "150px", padding: "10px" }}
        onClick={() => store.dispatch(startQuiz())}
      >
        Testi Başlat
      </Button>
    </Stack>
  );
};
