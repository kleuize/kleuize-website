import React from "react";
//Component
import SvgColor from "./SvgColor";
// @mui
import { alpha, styled } from "@mui/material/styles";
import {
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
} from "@mui/material";
// utils
import { fDate } from "../../utils/formatTime";
import { Capitalize } from "../../utils/Capitalize";

// -----------------------------Styled------------------------------------ //

const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const StyledTitle = styled(Link)(({ theme }) => ({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  border: 20,
  borderWidth: 4,
  borderColor: "white",
  position: "absolute",
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const StyledInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const StyledCover = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
});

// -----------------------------InstructorCard------------------------------------ //

export const InstructorCourseCard = ({ course, index }: any) => {
  const {
    name,
    slug,
    image,
    published,
    updatedAt,
  } = course;

  // const latestPostLarge = index === 0;
  // const latestPost = index === 1 || index === 2;
  const latestPostLarge = index === -1;
  const latestPost = index === -1 || index === -2;

  return (
    <Grid
      item
      xs={12}
      sm={latestPostLarge ? 12 : 6}
      md={latestPostLarge ? 6 : 3}
    >
      <Card sx={{ position: "relative" }}>
        <StyledCardMedia
          sx={{
            ...((latestPostLarge || latestPost) && {
              pt: "calc(100% * 4 / 3)",
              "&:after": {
                top: 0,
                content: "''",
                width: "100%",
                height: "100%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
            ...(latestPostLarge && {
              pt: {
                xs: "calc(100% * 4 / 3)",
                sm: "calc(100% * 3 / 4.66)",
              },
            }),
          }}
        >
          <SvgColor
            color="paper"
            src="/shape-avatar.svg"
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: "absolute",
              color: "background.paper",
              ...((latestPostLarge || latestPost) && { display: "none" }),
            }}
          />
          <StyledAvatar
            alt={name}
            src={image.Location}
            sx={{
              ...((latestPostLarge || latestPost) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40,
              }),
            }}
          />
          <StyledCover alt={name} src={image.Location} />
        </StyledCardMedia>
        <CardContent
          sx={{
            pt: 4,
            ...((latestPostLarge || latestPost) && {
              bottom: 0,
              width: "100%",
              position: "absolute",
            }),
          }}
        >
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {/*
            //@ts-ignore  */}
            {` Son güncelleme: ${fDate(updatedAt)}`}
          </Typography>
          <Typography
            gutterBottom
            variant="caption"
            noWrap
            sx={{ color: "text.disabled", display: "block" }}
          >
            {course.lessons.length < 5
              ? "Yayınlamak için 5 ders gerekli"
              : published
              ? "Kurs yayında"
              : "Kurs yayınlanmaya hazır"}
          </Typography>
          <StyledTitle
            color="inherit"
            href={`/instructor/course/view/${slug}`}
            variant="subtitle2"
            underline="hover"
            sx={{
              ...(latestPostLarge && { typography: "h5", height: 60 }),
              ...((latestPostLarge || latestPost) && {
                color: "common.white",
              }),
            }}
          >
            {Capitalize(name)}
          </StyledTitle>

          <StyledInfo>
            <Typography
              color={published ? "#27DF97" : "#EF5D51"}
              variant="subtitle1"
            >
              {published ? "Yayınlandı" : "Yayınlanmadı"}
            </Typography>
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
};
