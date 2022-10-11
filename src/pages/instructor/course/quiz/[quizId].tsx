import { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";

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

const quiz = () => {
  //   const [quizValues, setQuizValues] = useState({
  //     quizTitle: "",
  //     questions: [{ content: "", answers: [{ id: 0, text: "" }] }],
  //   });

  const router = useRouter();
  console.log(router);
  const { quizId } = router.query;

  const [courses, setCourses] = useState<any[]>();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  console.log(courses);

  //@ts-ignore
  const currentQuiz = courses?.map(({ lessons }: any) => {
    lessons.map(({ quiz }: any) =>
      quiz
        .filter((id: any) => id._id === quizId)
        .map(({ quizTitle, questions }: any) =>
          console.log(quizTitle, questions)
        )
    );
  });

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {courses &&
          courses?.map(({ lessons }: any) =>
            lessons.map(({ quiz }: any) =>
              quiz
                .filter((id: any) => id._id === quizId)
                .map(({ _id, quizTitle, questions }: any) => (
                  <Box>
                    <Typography>{` Soru ${
                      quizTitle.indexOf() + 2
                    }`}</Typography>
                    <Typography>{quizTitle}</Typography>
                    {questions.map(({ answers, content }: any) => (
                      <Box>
                        <Typography>{content}</Typography>
                        {answers.map(({ text, isCorrect }: any) => (
                          <Box>
                            <Typography
                              sx={{
                                backgroundColor: isCorrect ? "green" : "red",
                              }}
                            >
                              {text}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    ))}
                  </Box>
                ))
            )
          )}
      </Box>
    </Container>
  );
};

export default quiz;
