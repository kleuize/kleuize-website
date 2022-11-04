//next
import Image from "next/image";
// @mui
import { styled } from "@mui/material/styles";
import {
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Chip,
} from "@mui/material";
//component
import { LoadingSpinner } from "../LoadingSpinner";
//utils
import { fDate } from "../../utils/formatTime";
import { currencyFormatter } from "../../utils/helpers";
import { Capitalize } from "../../utils/Capitalize";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  backgroundColor: "transparent",
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export const SingleCourseJumbotron = ({
  course,
  loading,
  user,
  handlePaidEnrollment,
  handleFreeEnrollment,
  enrolled,
}: any) => {
  const { name, description, instructor, updatedAt, price, paid, category } =
    course;

  return (
    <RootStyle>
      <CardContent
        sx={{
          color: "grey.800",
          p: { md: 0 },
          pl: { md: 5 },
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          sx={{
            pb: { xs: 3, xl: 5 },
            maxWidth: 720,
            mx: "auto",
          }}
        >
          <strong>{name}</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 720, mx: "auto" }}
        >
          {description}
        </Typography>
        <Chip variant="outlined" label={category} />
        <Stack sx={{mb: 1, mt:1}}>
        <Typography variant="body2" >
          {/*
            //@ts-ignore  */}
          {` Son güncelleme: ${fDate(updatedAt)}`}
        </Typography>
        </Stack>
        <Typography
          variant="body2"
          sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 720, mx: "auto" }}
        >
          {`Hazırlayan: ${Capitalize(instructor.name)}`}
        </Typography>

        <Typography variant="inherit" color="success" >
          {paid ? (
            currencyFormatter({
              amount: price,
              currency: "usd",
            })
          ) : (
            <strong> Ücretsiz</strong>
          )}
        </Typography>
  
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <Button
              variant="contained"
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
              sx={{ mt:1}}
            >
              {user ? (enrolled.status ? "Kursa Git" : "Kayıt Ol") : "Kayıtlı"}
            </Button>
          </div>
        )}
      </CardContent>
      <Stack
        sx={{
          p: 3,
          margin: { xs: "auto", md: "inherit" },
        }}
      >
        <Image
          alt={name}
          src={course && course.image ? course.image.Location : "/course.jpg"}
          width={460}
          height={360}
        />
      </Stack>
    </RootStyle>
  );
};
