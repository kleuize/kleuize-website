import React from "react";
//next
import Image from "next/image";
//@mui
import { Stack } from "@mui/material";
//utils
import { useRotateIconStyles } from "../utils/RotetesIcon";
//img
import spinner from "../../public/spinner.png";

export const LoadingSpinner = () => {
  const classes = useRotateIconStyles();
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
        zIndex: 999,
        position: "absolute",
      }}
    >
      <Image
        className={classes.rotateIcon}
        src={spinner}
        alt="loading..."
        width={50}
        height={50}
      />
    </Stack>
  );
};
