import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";
//UI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Tooltip } from "@material-ui/core";

import { StudentLayout } from "../../../../components/layout/StudentLayout";
import { QuizTest } from "../../../../components/quizzes/quiz-test";
import Quizzes from "../../../../components/quizzes";
import { NextPageWithLayout } from "../../../../types";
import Page from "../../../../components/Page";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: 5,
}));

const style = {
  width: "50%",
  height: "100%",
  boxShadow: 24,
  justifyContent: "center",
  alignItems: "center",
  p: 4,
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}

const Quiz: NextPageWithLayout = () => {
  const [course, setCourse] = useState<any>();
  const router = useRouter();
  const { slug, quizId } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  return (
    <Page title="Test Çözüm">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop={10}
        marginLeft={5}
        marginRight={5}
      >
        <Grid item container>
          <Quizzes slug={slug} quizId={quizId} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Quiz;

Quiz.getLayout = function getLayout(page: React.ReactElement) {
  return <StudentLayout>{page}</StudentLayout>;
};
