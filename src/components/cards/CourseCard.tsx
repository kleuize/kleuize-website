// @mui
import { alpha, styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Link,
  Card,
  Grid,
  Avatar,
  Typography,
  CardContent,
} from "@mui/material";
import SvgColor from "./SvgColor";
import { fDate } from "../../utils/formatTime";
import { Capitalize } from "../../utils/Capitalize";
import { currencyFormatter } from "../../utils/helpers";

// utils
// ----------------------------------------------------------------------

const StyledCardMedia = styled("div")({
  position: "relative",
  paddingTop: "calc(100% * 3 / 4)",
});

const StyledTitle = styled(Link)({
  height: 44,
  overflow: "hidden",
  WebkitLineClamp: 2,
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
});

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

// ----------------------------------------------------------------------

export const CourseCard = ({ course, index }: any) => {
  const { name, instructor, price, image, slug, paid, category, updatedAt } =
    course;
  // const latestPostLarge = index === 0;
  // const latestPost = index === 1 || index === 2;
  const latestPostLarge = index === -1;
  const latestPost = index === -1 || index === -2;

  //   const POST_INFO: any = [
  //     { number: comment, icon: 'eva:message-circle-fill' },
  //     { number: view, icon: 'eva:eye-fill' },
  //     { number: share, icon: 'eva:share-fill' },
  //   ];

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
            {`${Capitalize(instructor.name)}`}
          </Typography>
          <Typography
            gutterBottom
            variant="caption"
            sx={{ color: "text.disabled", display: "block" }}
          >
            {/* 
            // @ts-ignore */}
            {` Son güncelleme: ${fDate(updatedAt)}`}
          </Typography>
          <StyledTitle
            color="inherit"
            href={`/course/${slug}`}
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
            <Typography color="inherit" variant="subtitle1">
              {paid
                ? currencyFormatter({
                    amount: price,
                    currency: "trl",
                  })
                : "Free"}
            </Typography>
            {/* {POST_INFO.map((info: any, index: number) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...((latestPostLarge || latestPost) && {
                    color: 'grey.500',
                  }),
                }}
              >
            <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} /> 
                <Typography variant="caption">{price}</Typography>
              </Box>
            ))} */}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  );
};
