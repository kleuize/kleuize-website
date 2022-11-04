import {
  Container,
  Box,
  Button,
  Stack,
  Drawer,
  Grid,
  Typography,
} from "@mui/material";
//next
import Image from "next/image";
import { StudentLayout } from "../../../../components/layout/StudentLayout";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { LessonAccordion } from "../../../../components/accordion/LessonAccordion";
import { SingleCourseLessons } from "../../../../components/cards/SingleCourseLessons";
import Quiz from "../../../../components/quizzes";
import Page from "../../../../components/Page";
import Started from "../../../../../public/start.png";

const drawerWidth = 280;

const QuizLayout = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[500],
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  width: "25%",
  height: 500,
  marginTop: 5,
  marginRight: 10,
  padding: 2,
}));
const LessonLayout = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[500],
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  width: "75%",
  height: 500,
  marginTop: 5,
  marginLeft: 30,
}));

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  // force state update
  const [updateState, setUpdateState] = useState(false);

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  return (
    <Page title="Soru Çözümü">
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        marginTop={10}
        marginLeft={5}
        marginRight={5}
      >
        <Grid item>
          <Image src={Started} alt="start" width="300px" height="300px" />
        </Grid>
        <Grid item>
          <Typography variant="body1">Başlamak için seçim yapın</Typography>
        </Grid>
      </Grid>
    </Page>
  );
};

export default SingleCourse;

SingleCourse.getLayout = function getLayout(page: React.ReactElement) {
  return <StudentLayout>{page}</StudentLayout>;
};
