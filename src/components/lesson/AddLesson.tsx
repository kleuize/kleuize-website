import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changeLessonTitle } from "../../store/create-lesson/create-lesson-slice";
import Button from "@mui/material/Button";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  justifyContent: "center",
  alignItems: "center",
  p: 4,
};

interface ICreateLessonProps {
  lessonTitle: string;
  lessonIndex: number;
}

interface IAddLessonModal {
  openModal: any;
  closeModal: any;
}
export const AddLesson = ({ openModal, closeModal }: IAddLessonModal) => {
  const dispatch = useAppDispatch();

  const { lessonTitle } = useAppSelector((state) => state.createLesson);

  const handleChangeLessonTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    dispatch(changeLessonTitle(value));
  };

  const [course, setCourse] = useState({});
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

  const handleSubmit = async (e: any) => {
    try {
      // console.log(values);
      const { data } = await axios.post(
        //@ts-ignore
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        { lessonTitle }
      );
      toast("Ders Eklendi! Şimdi test eklemeye başlayabilirsiniz.");
      // router.push(`/instructor/course/view/${slug}`);
    } catch (err: any) {
      toast(err.response.data);
    }
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box sx={style}>
        <Container>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Typography color="primary" variant="h4" component="div" mb={4}>
              Ders Oluştur
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={lessonTitle}
                  onChange={handleChangeLessonTitle}
                  label="Ders Ana Başlığı"
                  variant="outlined"
                  size="medium"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <LoadingButton
                  size="large"
                  fullWidth
                  variant="outlined"
                  onClick={handleSubmit}
                  // onClick={() => dispatch(createLesson())}
                >
                  Kaydet
                </LoadingButton>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  size="large"
                  onClick={closeModal}
                >
                  Kapat
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};
