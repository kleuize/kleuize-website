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

export interface ICourseViewProps {
  _id?: string;
  image?: any;
  name?: string;
  category?: string;
  lessons?: any;
  published?: boolean;
  description?: string;
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
    video: {},
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
    course;
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
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
                <Button
                  onClick={() => {
                    console.log("yayından kaldır");
                  }}
                >
                  Yayından Kaldır
                </Button>
              </Grid>
            ) : (
              <Grid item>
                <Button
                  onClick={() => {
                    console.log("yayınla");
                  }}
                >
                  Yayınlandı
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
                <Typography
                  id="keep-mounted-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Text in a modal
                </Typography>
                <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
          </Grid>
        </Grid>
      </Container>
    </InstructorRouteWrapper>
  );
};

export default CourseView;
