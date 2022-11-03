// @mui
import { styled } from "@mui/material/styles";
import { Typography, Button, Card, CardContent, Stack, Box } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import { useRouter } from "next/router";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  paddingTop: 10,
  paddingBottom: 10,
  marginRight: 20,
  backgroundColor: "#ECF2FD",
  [theme.breakpoints.up("md")]: {
    height: "100%",
    display: "flex",
    textAlign: "left",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

// ----------------------------------------------------------------------

export const InstructorCourseDetailsCard = ({
  course,
  publish,
  unPublish,
  addLesson,
}: any) => {
  const {
    name,
    description,
    category,
    slug,
    image,
    price,
    published,
    updatedAt,
    lessons,
  } = course;

  const router = useRouter();

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
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 720, mx: "auto" }}
        >
          {description}
        </Typography>
        <Typography variant="body2">
          {/*
            //@ts-ignore  */}
          {` Son güncelleme: ${fDate(updatedAt)}`}
        </Typography>
        <Typography variant="caption">{`Kategori: ${category}`}</Typography>
        <Typography variant="inherit">{`Fiyat: ₺${price}`}</Typography>
        <Box sx={{mb: 2, mt: 2}}>
          {lessons && lessons.length < 5 ? (
            <Typography>
              {`Kursu yayınlamak için 5 ders gerekli. Mevcut ders sayısı ${lessons.length}`}
            </Typography>
          ) : published ? (
            <Button variant="contained" color="error" onClick={unPublish}>
              Yayından Kaldır
            </Button>
          ) : (
            <Button variant="contained" color="success" onClick={publish}>
              Yayınla
            </Button>
          )}
        </Box>
        <Button onClick={addLesson} variant="contained">
          Ders Ekle
        </Button>
        <Button
          sx={{ ml: 5 }}
          onClick={() => router.push(`/instructor/course/edit/${slug}`)}
          variant="contained"
        >
          Düzenle
        </Button>
      </CardContent>
      <Stack
        sx={{
          p: 3,
          width: 560,
          margin: { xs: "auto", md: "inherit" },
        }}
      >
        <img
          alt={name}
          src={course && course.image ? course.image.Location : "/course.jpg"}
        />
      </Stack>
    </RootStyle>
  );
};
