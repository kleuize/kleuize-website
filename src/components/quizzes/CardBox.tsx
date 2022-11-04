import React, { ReactNode } from "react";
import { createStyles, makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface CardBoxProps {
  children: ReactNode;
}

export const CardBox: React.FC<CardBoxProps> = ({ children }) => {
  return (
    <Card sx={{ width: "100%", height: "100vh" }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
