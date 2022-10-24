import { CircularProgress, Box, Theme } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: "400px",
    maxHeight: "400px",
    width: "100%",
    position: "relative",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  box: {
    flexGrow: 1,
  },
}));

export const Loading: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <CircularProgress size={50} className={classes.root} />
    </Box>
  );
};
