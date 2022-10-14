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

export const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}: any) => {
  const [openedItemId, setOpenedItemId] = useState(true);

  const handleClick = (e: any) => {
    let clickedItemId = e.currentTarget.id;
    if (openedItemId === clickedItemId) {
      //@ts-ignore
      setOpenedItemId("");
    } else {
      setOpenedItemId(clickedItemId);
    }
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
                      <ListItemButton sx={{ martinLeft: 2 }} id={_id}>
                        <ListItemText primary={quizTitle} />
                      </ListItemButton>
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
