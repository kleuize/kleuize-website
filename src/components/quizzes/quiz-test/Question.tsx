import React from "react";
//@mui
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface QuestionProps {
  content: string;
}

export const Question = ({ content }: QuestionProps) => {
  return (
    <Card sx={{ minWidth: 275, mb: 2, border: 0.2 }}>
      <CardContent>
        <Typography sx={{ color: "#08104D" }} variant="body1">
          <strong> {content}</strong>
        </Typography>
      </CardContent>
    </Card>
  );
};
