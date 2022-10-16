import { Container, Box, Button, Stack, Drawer, Toolbar } from "@mui/material";
import { StudentRouterWrapper } from "../../../components/routes/StudentRouterWrapper";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { LessonAccordion } from "../../../components/accordion/LessonAccordion";
import { SingleCourseLessons } from "../../../components/cards/SingleCourseLessons";
import { LessonNav } from "../../../components/accordion/lessonNav";

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
      <Stack sx={{ display: "flex", flexDirection: "row", mt: 10 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            mt: 10,
            borderRadius: 5,
            
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
            
            },
          }}
        >
          <Toolbar />
          <LessonNav lessons={course.lessons} />
        </Drawer>
        <LessonLayout>Test</LessonLayout>
      </Stack>
    </StudentRouterWrapper>
  );
};

export default SingleCourse;
