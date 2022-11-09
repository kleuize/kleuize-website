import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";

interface QuizResultProps {
  score: number;
}

export const QuizResult: React.FC<QuizResultProps> = ({ score }) => {
  return (
    <>
      <Typography color="secondary" variant="h4" component="div" mb={4}>
        Quiz Result
      </Typography>

      <Box mb={4}>
        <CircularProgressWithLabel value={score} />
      </Box>

      <Typography variant="h6" mb={1}>
        Tebrikler, testi tamamladınız. Sıradaki teste geçebilirsiniz.
      </Typography>
      <Typography variant="h6">
        <strong> {score}%</strong> soruya doğru cevap verdiniz.
      </Typography>
    </>
  );
};
