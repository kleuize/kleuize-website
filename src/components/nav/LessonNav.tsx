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
import {
  Drawer,
  List,
  ListItem,
  Typography,
  Stack,
  Checkbox,
} from "@mui/material";
import Link from "next/link";

const drawerWidth = 330;

export const LessonNav = ({ lessons }: any) => {
  const [openedItemId, setOpenedItemId] = useState(true);
  const [quizId, setQuizId] = useState();

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

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
    <nav>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            marginTop: 8,
          },
        }}
      >
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            {lessons && <h4> Kurs İçeriği: {lessons.length} Ders</h4>}
          </Typography>
        </Stack>
        <Box
          sx={{
            bgcolor: openedItemId
              ? "rgba(41, 98, 174, 0.1)"
              : "rgba(41, 98, 174, 0.2)",
          }}
        >
          {lessons?.map(({ lessonTitle, quiz, _id }: any, index: number) => (
            <div>
              {quiz != null ? (
                <>
                  <ListItem id={_id} onClick={handleClick}>
                    {openedItemId === _id ? <ExpandLess /> : <ExpandMore />}
                    <ListItemText
                      primary={`Ders ${index + 1}: ${lessonTitle}`}
                    />
                  </ListItem>
                  <Divider />
                  <Collapse
                    in={openedItemId === _id}
                    timeout="auto"
                    unmountOnExit
                  >
                    {openedItemId &&
                      quiz.map(({ _id, quizTitle }: any) => (
                        <Stack sx={{ display: "flex", flexDirection: "row" }}>
                          <Link href={`/course/lesson/quiz/${_id}`}>
                            <ListItemButton id={_id} onClick={handleQuizId}>
                              <ListItemText primary={quizTitle} />
                            </ListItemButton>
                          </Link>
                          <Checkbox
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        </Stack>
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
        <Stack sx={{ mt: 8, height: 10 }}></Stack>
      </Drawer>
    </nav>
  );
};
