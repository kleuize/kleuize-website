import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import InstructorRouteWrapper from "../../../../components/routes/InstructorRouterWrapper";
import axios from "axios";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { FileUploadOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { AddLessonForm } from "../../../../components/form/AddLessonForm";

import { toast } from "react-toastify";

export interface ICourseViewProps {
  _id?: string;
  image?: any;
  name?: string;
  category?: string;
  lessons?: any;
  published?: boolean;
  description?: string;
  instructor?: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CourseView: NextPage = () => {
  const [course, setCourse] = useState<ICourseViewProps>({});
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    quiz: {},
  });

  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);
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
    console.log("STUDENT COUNT => ", data);
    setStudents(data.length);
  };

  const handleAddLesson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      setValues({ ...values, title: "", content: "", quiz: {} });
      setProgress(0);
      setUploadButtonText("Upload Quiz");
      setVisible(false);
      setCourse(data);
      toast("Lesson added");
    } catch (error) {
      console.log(error);
      toast("Lesson add failed");
    }
  };

  const handleQuiz = async (event: React.ChangeEvent<HTMLFormElement>) => {
    try {
      const target = event.target;
      const file: File = (target.files as FileList)[0];
      setUploadButtonText(file.name);
      const quizData = new FormData();
      quizData.append("quiz", file);
      const { data } = await axios.post(
        `/api/course/quiz-uploaded/${course.instructor._id}`,
        quizData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      setValues({ ...values, quiz: data });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
      toast("Video upload failed");
    }
  };

  const handleQuizRemove = async () => {
    try {
      setUploading(true);
      const { data } = await axios.post(
        `/api/course/quiz-remove/${course.instructor._id}`,
        values.quiz
      );
      console.log(data);
      setValues({ ...values, quiz: {} });
      setUploading(false);
      setUploadButtonText("Başka soru yükle");
    } catch (error) {
      setUploading(false);
      toast("Video remove failed");
    }
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
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                alt={`${slug}`}
                image={course.image ? course.image.Location : "/course.png"}
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
            <IconButton onClick={() => setVisible(true)}>
              <FileUploadOutlined aria-label="Ders Ekle" />
              Ders Ekle
            </IconButton>
          </Grid>
          <Grid>
            <Modal open={visible} onClose={() => setVisible(false)}>
              <Box sx={style}>
                <AddLessonForm
                  values={values}
                  setValues={setValues}
                  handleAddLesson={handleAddLesson}
                  uploading={uploading}
                  uploadButtonText={uploadButtonText}
                  handleQuiz={handleQuiz}
                  progress={progress}
                  handleQuizRemove={handleQuizRemove}
                />
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Container>
    </InstructorRouteWrapper>
  );
};

export default CourseView;
