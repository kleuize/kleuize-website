import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";

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
  justifyContent: "center",
  alignItems: "center",
  p: 4,
  overflow: "scroll",
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
  const [values, setValues] = useState<ICreateLessonProps>({
    lessonTitle: "",
    lessonIndex: 0,
  });

  const handleChangeLessonTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, lessonTitle: event.target.value });
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
    e.preventDefault();
    try {
      // console.log(values);
      const { data } = await axios.post(
        //@ts-ignore
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        { ...values }
      );
      toast("Great! Now you can start adding lessons");
      router.push("/instructor");
    } catch (err: any) {
      toast(err.response.data);
    }
  };

  return (
    <Modal open={openModal} onClose={closeModal}>
      <Box sx={style}>
        <Container>
          {values && (
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Typography color="primary" variant="h4" component="div" mb={4}>
                Ders Oluştur
              </Typography>
              <Grid container>
                <Grid item xs={12} mb={3}>
                  <TextField
                    value={values.lessonTitle}
                    onChange={handleChangeLessonTitle}
                    label="Ders Ana Başlığı"
                    variant="outlined"
                    size="medium"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <LoadingButton
                    size="large"
                    fullWidth
                    variant="outlined"
                    onClick={handleSubmit}
                  >
                    Kaydet
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
          )}
        </Container>
      </Box>
    </Modal>
  );
};
