import React from "react";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    
    color: "#fff",
  
    borderRadius: "12px",
 
  },
  cardContent: {
    "&:last-child": {
     
    },
  },
}));

interface QuestionProps {
  content: string;
}

export const Question = ({ content }: QuestionProps) => {
  const classes = useStyles();

  return (
    <Card sx={{ minWidth: 275 }} className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography variant="body1">{content}</Typography>
      </CardContent>
    </Card>
  );
};
