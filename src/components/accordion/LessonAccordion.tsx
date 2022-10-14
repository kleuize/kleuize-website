import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
//UI
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
//Icon
import AddIcon from "@mui/icons-material/Add";
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
//Component
import { ICourseViewProps } from "../../types";
import { TestAddQuiz } from "../quiz/AddQuiz";
import Divider from "@mui/material/Divider";
import { ListItem, ListItemIcon, Stack, Tooltip } from "@mui/material";
import { EditLesson } from "../lesson/EditLesson";
import Link from "next/link";
// import { EditQuiz } from "../quiz/EditQuiz";

export const LessonAccordion = () => {
  const [course, setCourse] = useState<ICourseViewProps>({});
  const [openedItemId, setOpenedItemId] = useState(true);
  const [openedEditQuizItemId, setOpenedEditQuizItemId] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const [visibleQuiz, setVisibleQuiz] = useState(false);
  const [visibleEditLesson, setVisibleEditLesson] = useState(false);
  const [visibleShowQuiz, setVisibleShowQuiz] = useState(false);
  const [quizId, setQuizId] = useState();

  const [lessonId, setLessonId] = useState();

  const handleClick = (e: any) => {
    let clickedItemId = e.currentTarget.id;
    setLessonId(clickedItemId);
    if (openedItemId === clickedItemId) {
      //@ts-ignore
      setOpenedItemId("");
    } else {
      setOpenedItemId(clickedItemId);
    }
  };

  const handleQuizId = (e: any) => {
    let currentQuizId = e.currentTarget.id;
    setQuizId(currentQuizId);
    console.log(currentQuizId);
  };

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

  const handleDelete = async (index: any) => {
    const answer = window.confirm(
      "Eğer dersi silerseniz içindeki tüm testlerde silinecektir. Onaylıyor musunuz?"
    );
    if (!answer) return;
    let allLessons = course.lessons;
    const removed = allLessons.splice(index, 1);
    // console.log("removed", removed[0]._id);
    setCourse({ ...course, lessons: allLessons });
    // send request to server
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    console.log("LESSON DELETED =>", data);
  };

  return (
    <Box
      sx={{
        bgcolor: openedItemId
          ? "rgba(71, 98, 120, 0.2)"
          : "rgba(41, 98, 120, 0.2)",
      }}
    >
      {course &&
        course.lessons?.map(({ lessonTitle, quiz, _id, index }: any) => (
          <div>
            {quiz != null ? (
              <>
                <ListItem
                  id={_id}
                  onClick={handleClick}
                  secondaryAction={
                    <>
                      <Tooltip title="Düzenle">
                        <ListItemIcon
                          onClick={() => setVisibleEditLesson(true)}
                        >
                          <EditOutlinedIcon />
                        </ListItemIcon>
                      </Tooltip>
                      <Tooltip title="Sil">
                        <ListItemIcon onClick={() => handleDelete(index)}>
                          <ClearOutlinedIcon />
                        </ListItemIcon>
                      </Tooltip>
                    </>
                  }
                >
                  {openedItemId === _id ? <ExpandLess /> : <ExpandMore />}
                  <ListItemText primary={lessonTitle} />
                </ListItem>
                <Divider />
                <Collapse
                  in={openedItemId === _id}
                  timeout="auto"
                  unmountOnExit
                >
                  {openedItemId &&
                    quiz.map(({ _id, quizTitle }: any) => (
                      <Link href={`/instructor/course/quiz/${_id}`}>
                        <ListItemButton
                          sx={{ martinLeft: 2 }}
                          id={_id}
                          onClick={handleQuizId}
                        >
                          <ListItemText primary={quizTitle} />
                        </ListItemButton>
                      </Link>
                    ))}
                  <Stack alignItems="center">
                    <Tooltip title="Yeni Test Ekle">
                      <ListItemButton onClick={() => setVisibleQuiz(true)}>
                        <AddIcon />
                      </ListItemButton>
                    </Tooltip>
                  </Stack>
                  <Divider />
                </Collapse>
              </>
            ) : (
              <ListItemButton id={_id} sx={{ marginLeft: "50%" }}>
                <ListItemText primary={lessonTitle} />
              </ListItemButton>
            )}
          </div>
        ))}
      <TestAddQuiz
        openModal={visibleQuiz}
        closeModal={() => setVisibleQuiz(false)}
        lessonId={lessonId}
      />
      <EditLesson
        openEditLessonModal={visibleEditLesson}
        closeEditLessonModal={() => setVisibleEditLesson(false)}
        lessonId={lessonId}
      />
      {/* We will complete next times */}
      {/* {openedEditQuizItemId && (
        <EditQuiz
          openEditQuizModal={visibleEditQuiz}
          closeEditQuizModal={() => setVisibleEditQuiz(false)}
          quizId={quizId}
        />
      )} */}
    </Box>
  );
};
