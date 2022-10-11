import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import InstructorRouteWrapper from "../../../../components/routes/InstructorRouterWrapper";
import axios from "axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { ICourseViewProps } from "../../../../types";
import { AddLesson } from "../../../../components/lesson/AddLesson";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { LessonAccordion } from "../../../../components/accordion/LessonAccordion";
import Stack from "@mui/material/Stack";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const CourseView: NextPage = () => {
  const [course, setCourse] = useState<ICourseViewProps>({});
  const [visible, setVisible] = useState(false);
  const [students, setStudents] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course && studentCount();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  const studentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    setStudents(data.length);
  };

  const handleUnpublish = async (
    e: React.FormEvent<HTMLFormElement>,
    courseId: any
  ) => {
    console.log(course._id);
    try {
      let answer = window.confirm(
        "Kursunuzu yayından kaldırdıktan sonra, kullanıcıların kaydolması mümkün olmayacaktır."
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data);
      toast("Kursunuz yayınlanmamış");
    } catch (error) {
      toast("Kurs yayınlanamadı. Yeniden deneyin");
    }
  };

  const handlePublish = async (
    e: React.FormEvent<HTMLFormElement>,
    courseId: any
  ) => {
    try {
      let answer = window.confirm(
        "Kursunuzu yayınladıktan sonra, kullanıcıların kaydolabilmesi için yayında olacak"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);
      toast("Tebrikler! Kursunuz yayınlandı.");
    } catch (error) {
      toast("Kurs yayınlanamadı. Yeniden deneyin");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <InstructorRouteWrapper>
        <Container sx={{ mt: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={12} mt={1} mb={4}>
              <Typography component="div" variant="h5">
                {`Kurs Adı: ${course && course.name}`}
              </Typography>
            </Grid>
            <Card sx={{ display: "flex" }}>
              <Grid item xs={12} mt={2}>
                <CardMedia
                  component="img"
                  height="300"
                  width="400"
                  alt={`${slug}`}
                  src={
                    course && course.image
                      ? course.image.Location
                      : "/course.jpg"
                  }
                />
              </Grid>
            </Card>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Grid item xs={6} sm={6}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {course && course.lessons && course.lessons.length} Ders
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {`Kategori: ${course && course.category}`}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  fontSize={100}
                >
                  {`₺${course && course.price}`}
                </Typography>
              </Grid>
              <Grid item>
                {course && course.lessons && course.lessons.length < 5 ? (
                  <Grid item xs={12} sm={12} maxWidth={300}>
                    <Typography >
                      {`Kursu yayınlamak için 5 ders gerekli. Mevcut ders sayısı ${course.lessons.length}`}
                    </Typography>
                  </Grid>
                ) : course && course.published ? (
                  <Grid item>
                    <Button
                      onClick={(e: any) => handleUnpublish(e, course._id)}
                    >
                      Yayından Kaldır
                    </Button>
                  </Grid>
                ) : (
                  <Grid item>
                    <Button onClick={(e: any) => handlePublish(e, course._id)}>
                      Yayınla
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={4} sm={4} mt={2}>
                <Button
                  onClick={() => router.push(`/instructor/course/edit/${slug}`)}
                  size="medium"
                  variant="contained"
                  color="primary"
                >
                  Düzenle
                </Button>
              </Grid>
            </CardContent>
          </Grid>
        </Container>
        <Container sx={{ mt: 5 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Typography component="div" variant="h6" color="#08104d">
                Kurs Açıklaması
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} mt={2}>
              <Typography paragraph> {course && course.description}</Typography>
            </Grid>
            <Grid item xs={12}>
              <LessonAccordion />
            </Grid>
            <Grid item xs={12}>
              <Stack alignItems="center">
                <Button onClick={() => setVisible(true)}>Ders Ekle</Button>
              </Stack>
              <AddLesson
                openModal={visible}
                closeModal={() => setVisible(false)}
              />
            </Grid>
          </Grid>
        </Container>
      </InstructorRouteWrapper>
    </ThemeProvider>
  );
};

export default CourseView;
