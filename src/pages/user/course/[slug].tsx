import { Container, Box, Button, Stack, Drawer, Toolbar } from "@mui/material";
import { StudentRouterWrapper } from "../../../components/layout/StudentLayout";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { LessonAccordion } from "../../../components/accordion/LessonAccordion";
import { SingleCourseLessons } from "../../../components/cards/SingleCourseLessons";

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
  marginLeft: 30
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
    <StudentRouterWrapper>
      <LessonLayout>Test</LessonLayout>
    </StudentRouterWrapper>
  );
};

export default SingleCourse;
