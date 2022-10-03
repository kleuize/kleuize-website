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
import { TestAddQuiz } from "../../../../components/quiz/AddQuiz";
import { AddLesson } from "../../../../components/quiz/AddLesson";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";

const CourseView: NextPage = () => {
  const [course, setCourse] = useState<ICourseViewProps>({});
  const [visible, setVisible] = useState(false);
  const [visibleQuiz, setVisibleQuiz] = useState(false);
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
    <InstructorRouteWrapper>
      <Container sx={{ mt: 5 }}>
        <Grid container>
          <Card sx={{ display: "flex" }}>
            <Grid item xs={12}>
              <CardMedia
                component="img"
                height="300"
                width="400"
                alt={`${slug}`}
                src={course.image ? course.image.Location : "/course.jpg"}
              />
            </Grid>
          </Card>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Grid item xs={12} sm={12}>
                <Typography component="div" variant="h5">
                  {course.name}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {course.lessons && course.lessons.length} Ders
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {`Kategori: ${course.category}`}
                </Typography>
              </Grid>
            </CardContent>
          </Box>
        </Grid>
      </Container>

      <Container sx={{ mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                alt={`${slug}`}
                src={course.image ? course.image.Location : "/course.jpg"}
              />
            </Card>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography>{course.name}</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography>
              {course.lessons && course.lessons.length} Ders
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography> {`Kategori: ${course.category}`}</Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              onClick={() => router.push(`/instructor/course/edit/${slug}`)}
              size="medium"
              variant="contained"
              color="primary"
            >
              Düzenle
            </Button>
          </Grid>
          <Grid item>
            {course.lessons && course.lessons.length < 5 ? (
              <Grid item xs={12} sm={12}>
                <Typography>
                  {`Yayınlamak için minumum 5 ders gerekli. Mevcut ders sayısı ${course.lessons.length}`}
                </Typography>
              </Grid>
            ) : course.published ? (
              <Grid item>
                <Button onClick={(e: any) => handleUnpublish(e, course._id)}>
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
          <Grid item xs={12} sm={12}>
            {course.description}
          </Grid>
          <Grid item>
            {course.lessons && course.lessons.length < 1 ? (
              <Grid item xs={12} sm={12}>
                <Typography>Test Mevcut Değil</Typography>
              </Grid>
            ) : (
              <Grid item>
                {course &&
                  course.lessons?.map((lesson: any) => (
                    <List key={lesson._id}>
                      <Typography>{lesson.lessonTitle}</Typography>
                      <Button onClick={() => setVisibleQuiz(true)}>
                        Soru Ekle
                      </Button>
                      <TestAddQuiz
                        openModal={visibleQuiz}
                        closeModal={() => setVisibleQuiz(false)}
                      />
                    </List>
                  ))}
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => setVisible(true)}>Ders Ekle</Button>
            <AddLesson
              openModal={visible}
              closeModal={() => setVisible(false)}
            />
          </Grid>
        </Grid>
      </Container>
    </InstructorRouteWrapper>
  );
};

export default CourseView;
