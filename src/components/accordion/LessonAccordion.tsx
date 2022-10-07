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
//Component
import { ICourseViewProps } from "../../types";
import { TestAddQuiz } from "../quiz/AddQuiz";

export const LessonAccordion = () => {
  const [course, setCourse] = useState<ICourseViewProps>({});
  const [openedItemId, setOpenedItemId] = useState(true);
  const router = useRouter();
  const { slug } = router.query;
  const [visibleQuiz, setVisibleQuiz] = useState(false);

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

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course;
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    console.log(data);
    setCourse(data);
  };

  return (
    <Box
      sx={{
        bgcolor: openedItemId ? "rgba(71, 98, 120, 0.1)" : null,
      }}
    >
      {course.lessons?.map(({ lessonTitle, quiz, _id }: any) => (
        <div>
          {quiz != null ? (
            <>
              <ListItemButton
                id={_id}
                key={_id}
                onClick={handleClick}
              >
                <ListItemText primary={lessonTitle} />
                {openedItemId === _id ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openedItemId === _id} timeout="auto" unmountOnExit>
                {openedItemId &&
                  quiz.map(({ _id, quizTitle }: any) => (
                    <ListItemButton key={_id}>
                      <ListItemText key={_id} primary={quizTitle} />
                    </ListItemButton>
                  ))}
                <ListItemButton onClick={() => setVisibleQuiz(true)}>
                  <AddIcon />
                </ListItemButton>
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
    </Box>
  );
};
