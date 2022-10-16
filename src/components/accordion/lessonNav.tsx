import React, { useState } from "react";
//UI
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
//Icon
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
//Component
import Divider from "@mui/material/Divider";
import { ListItem } from "@mui/material";
import Link from "next/link";

export const LessonNav = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}: any) => {
  const [openedItemId, setOpenedItemId] = useState(true);
  const [quizId, setQuizId] = useState();



  const handleClick = (e: any) => {
    let clickedItemId = e.currentTarget.id;
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

  return (
    <Container>
      {lessons && <h4>{lessons.length} Lessons</h4>}
      <Box
        sx={{
          bgcolor: openedItemId
            ? "rgba(71, 98, 120, 0.2)"
            : "rgba(41, 98, 120, 0.2)",
        }}
      >
        {lessons.map(({ lessonTitle, quiz, _id }: any) => (
          <div>
            {quiz != null ? (
              <>
                <ListItem id={_id} onClick={handleClick}>
                  {openedItemId === _id ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Divider />
                <Collapse
                  in={openedItemId === _id}
                  timeout="auto"
                  unmountOnExit
                >
                  {openedItemId &&
                    quiz.map(({ _id, quizTitle }: any) => (
                      <Link href={`/course/lesson/quiz/${_id}`}>
                        <ListItemButton
                          sx={{ martinLeft: 2 }}
                          id={_id}
                          onClick={handleQuizId}
                        >
                          <ListItemText primary={quizTitle} />
                        </ListItemButton>
                      </Link>
                    ))}
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
      </Box>
    </Container>
  );
};
