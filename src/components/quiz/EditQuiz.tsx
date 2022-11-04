import { useState, useEffect } from "react";
//libraries
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
//Redux
import { useAppDispatch, useAppSelector } from "../../store/hooks";
//UI
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
//Slice
import {
  addQuestion,
  removeQuestion,
  changeQuestion,
  changePage,
  changeQuizTitle,
  changeAnswer,
  setSelectedAnswer,
  setLoading,
  createQuiz,
  validateForm,
} from "../../store/create-quiz/create-quiz-slice";
import { setQuiz } from "../../store/quiz/quiz-slice";

interface IQuizParentModal {
  openEditQuizModal: any;
  closeEditQuizModal: any;
  quizId: any;
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
  overflow: "scroll",
};

export interface ChangeAnswer {
  name: string;
  value: any;
}
export interface QuestionAnswer {
  id: string;
  text: string;
}
export interface Question {
  id?: string;
  content: string;
  answers: [QuestionAnswer, QuestionAnswer, QuestionAnswer, QuestionAnswer];
}
export interface CreateQuizState {
  quizTitle: string;
  questionIndex: number;
  questions: Array<Question>;
  selectedAnswers: Array<string>;
  isLoading: boolean;
  isValid: boolean;
  quizID: string;
  errorMessage: any;
}

export interface CreateLessonState {
  quizTitle: string;
  firstAnswerID: string;
  questionIndex: number;
  questions: Array<Question>;
  selectedAnswers: Array<string>;
  isLoading: boolean;
  isValid: boolean;
  quizID: string;
  errorMessage: any;
}
export const EditQuiz = ({
  openEditQuizModal,
  closeEditQuizModal,
  quizId,
}: IQuizParentModal) => {
  const firstAnswerID = uuidv4();
  const dispatch = useAppDispatch();

  const {
    quizTitle,
    questionIndex,
    questions,
    selectedAnswers,
    isLoading,
    isValid,
    errorMessage,
  } = useAppSelector((state) => state.createQuiz);

  const handleSelectAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAnswer = (event.target as HTMLInputElement).value;

    dispatch(setSelectedAnswer(selectedAnswer));
  };

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value) {
      dispatch(changePage(value - 1));
    }
  };

  const handleChangeQuizTitle = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    dispatch(changeQuizTitle(value));
  };

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    dispatch(changeQuestion(value));
  };

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    dispatch(changeAnswer({ name, value }));
  };

  const [course, setCourse] = useState({});
  const [quiz, setQuiz] = useState({});
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug)

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
    console.log(data);
  };

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course;
  }, [course]);

  const loadQuiz = async () => {
    const { data } = await axios.get(`/api/course/lesson/quiz/${quizId}`);
    setQuiz(data);
    console.log(data);
  };

  const currentQuestion = questions && questions[questionIndex];
  //@ts-ignore
  const selectedAnswer = selectedAnswers && selectedAnswers[questionIndex];

  const handleSubmit = async (e: any) => {
    dispatch(validateForm());
    // If the form is valid, we send a request to the api
    if (isValid) {
      dispatch(setLoading());
      try {
        const { data } = await axios.put(
          //@ts-ignore
          `/api/course/lesson/${slug}/${course.instructor._id}/${lessonId}/update-quiz`,
          { quizTitle, questions, selectedAnswers, isValid }
        );
        toast("Test Güncellendi");
        router.push(`/instructor/course/view/${slug}`);
      } catch (err: any) {
        toast(err.response.data);
      }
    }
  };

  return (
    <Modal open={openEditQuizModal} onClose={closeEditQuizModal}>
      <Box sx={style}>
        <Container>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Typography
                    color="secondary"
                    variant="h4"
                    component="div"
                    mb={1}
                  >
                    Testi Güncelle
                  </Typography>
                </Grid>
                {/* Quiz Title */}

                <Grid item xs={12} mb={1}>
                  <TextField
                    name="quizTitle"
                    value={quizTitle}
                    onChange={handleChangeQuizTitle}
                    label="Quiz Title"
                    variant="outlined"
                    size="medium"
                    fullWidth
                    inputProps={{ "data-testid": "quiz-title" }}
                  />
                </Grid>

                {/* Quiz Title */}
                <Grid item xs={12} mb={1}>
                  <Divider />
                </Grid>

                {/* Question */}
                <Grid item xs={12} mb={1}>
                  <TextField
                    name="currentQuestionContent"
                    value={currentQuestion.content}
                    onChange={handleChangeQuestion}
                    label={`Question ${questionIndex + 1}`}
                    variant="outlined"
                    size="medium"
                    fullWidth
                    inputProps={{ "data-testid": "question-content" }}
                  />
                </Grid>

                {/* Answers */}
                <Grid item>
                  <FormControl component="fieldset">
                    <Grid item mb={2}>
                      <FormLabel>
                        <Typography>
                          Cevapları Güncelle (Doğru cevabı seç.)
                        </Typography>
                      </FormLabel>
                    </Grid>
                    <RadioGroup
                      aria-label="gender"
                      name="radio-buttons-group"
                      value={selectedAnswer}
                      onChange={handleSelectAnswer}
                    >
                      {currentQuestion.answers.map(
                        (answer: any, index: any) => (
                          <Grid key={index} container item xs={12} md={12} mb={1}>
                            <FormControlLabel
                              key={answer.id}
                              value={answer.id}
                              control={
                                <Radio
                                  inputProps={{
                                    // @ts-ignore
                                    "data-testid": `answer-radio-${index + 1}`,
                                  }}
                                />
                              }
                              label={
                                <TextField
                                  label={`Answer ${index + 1}...`}
                                  name={answer.id}
                                  value={answer.text}
                                  onChange={handleChangeAnswer}
                                  inputProps={{
                                    "data-testid": `answer-text-${index + 1}`,
                                  }}
                                />
                              }
                            />
                          </Grid>
                        )
                      )}
                    </RadioGroup>
                  </FormControl>
                  {/* Pagination */}
                  <Grid item xs={12} mb={1}>
                    <Pagination
                      count={questions.length}
                      page={questionIndex + 1}
                      color="primary"
                      onChange={handleChangePage}
                      renderItem={(item) => {
                        if (item.type === "page") {
                          return (
                            <PaginationItem
                              {...item}
                              data-testid={`page-${item.page}`}
                            />
                          );
                        } else return <PaginationItem {...item} />;
                      }}
                    />
                  </Grid>
                  {/* Error Message */}
                  {errorMessage && (
                    <Grid item xs={12} mb={1}>
                      <Alert variant="filled" severity="error">
                        {errorMessage}
                      </Alert>
                    </Grid>
                  )}
                </Grid>
                {/* Buttons */}
                <Grid
                  container
                  item
                  direction="row"
                  xs={12}
                  mx="auto"
                  spacing={2}
                  justifyContent="center"
                >
                  <Grid item xs={12} md={3}>
                    <Button
                      sx={{ width: "100%" }}
                      variant="contained"
                      color="primary"
                      onClick={() => dispatch(removeQuestion())}
                      disabled={questions.length < 2}
                    >
                      Soruyu Kaldır
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Tooltip title="You can only have 10 questions max per quiz">
                      <div>
                        <Button
                          sx={{ width: "100%" }}
                          variant="contained"
                          color="primary"
                          onClick={() => dispatch(addQuestion())}
                          disabled={questions.length >= 10}
                        >
                          Yeni Soru Ekle
                        </Button>
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      sx={{ width: "100%" }}
                      variant="contained"
                      color="secondary"
                      onClick={handleSubmit}
                    >
                      Güncelle
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Button
                      sx={{ width: "100%" }}
                      variant="outlined"
                      color="error"
                      onClick={closeEditQuizModal}
                    >
                      İptal Et
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Modal>
  );
};
