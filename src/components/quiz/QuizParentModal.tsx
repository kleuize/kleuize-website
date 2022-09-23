import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AddLessonForm } from "../form/AddLessonForm";
import { useRouter } from "next/router";
import { ICourseViewProps } from "../../types";

import Button from "@mui/material/Button";
import { CreateQuizForm } from "../form/CreateQuizForm";
import { QuizChildModal } from "./QuizChildModal";

interface IQuizParentModal {
  openModal: any;
  closeModal: any;
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
  justifyContent: "center",
  alignItems: "center",
  p: 4,
};

export const QuizParentModal = ({
  openModal,
  closeModal,
}: IQuizParentModal) => {
  const [course, setCourse] = useState<ICourseViewProps>({});
  const [values, setValues] = useState({
    title: "",
    content: "",
    quiz: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0);
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
      openModal(false);
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

  return (
    <Modal open={openModal} onClose={closeModal}>
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

        <Button onClick={closeModal}>İptal Et</Button>
        {/* <Box sx={{ mt: -12, ml: "10%" }}> */}
        <QuizChildModal />
        {/* </Box> */}
      </Box>
    </Modal>
  );
};
