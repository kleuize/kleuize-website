import { useEffect, useState } from "react";
//next
import { useRouter } from "next/router";
//3rd
import axios from "axios";
//@mui-styled
import { Tooltip } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
//icons
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
//component
import Page from "../../../../components/Page";
import InstructorLayout from "../../../../components/layout/InstructorLayout";

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: 5,
}));

const Quiz = () => {
  const router = useRouter();
  const { quizId } = router.query;

  const [courses, setCourses] = useState<any[]>();

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  return (
    <Page title="Test Görünümü">
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
                  .map(({ quizTitle, questions }: any) => (
                    <Box sx={{ width: "80%" }}>
                      <Stack>
                        <Item
                          sx={{ marginBottom: 3 }}
                        >{` Test Başlığı: ${quizTitle}`}</Item>
                      </Stack>
                      <Divider />
                      {questions.map(
                        ({ answers, content }: any, index: number) => (
                          <Box>
                            <Stack>
                              <Item
                                sx={{
                                  marginTop: 2,
                                  marginBottom: 2,
                                  backgroundColor: "whiteSmoke",
                                  fontWeight: "bold",
                                }}
                              >{` Soru ${index + 1}: ${content}`}</Item>
                            </Stack>
                            <Divider />
                            <Box
                              sx={{
                                backgroundColor: "#ECF2FD",
                                p: 1,
                                borderRadius: 5,
                                mt: 2,
                              }}
                            >
                              {answers.map(({ text, isCorrect }: any) => (
                                <Stack spacing={2}>
                                  <Item
                                    sx={{
                                      backgroundColor: isCorrect
                                        ? "#ACFFC8"
                                        : null,
                                    }}
                                  >
                                    {text}
                                  </Item>
                                </Stack>
                              ))}
                            </Box>
                          </Box>
                        )
                      )}
                    </Box>
                  ))
              )
            )}
          <Stack sx={{ mt: 2 }}>
            <Button variant="contained" onClick={() => router.back()}>
              <Tooltip title="Bir Önceki Sayfa">
                <ArrowBackOutlinedIcon />
              </Tooltip>
            </Button>
          </Stack>
        </Box>
      </Container>
    </Page>
  );
};

export default Quiz;

Quiz.getLayout = function getLayout(page: React.ReactElement) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
