import React, { forwardRef, useState } from "react";
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
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetState } from "../../store/create-quiz/create-quiz-slice";
import { getQuizByCode } from "../../store/quiz/quiz-slice";

const drawerWidth = 330;

export const LessonNav = ({ lessons, slug }: any) => {
  const [openedItemId, setOpenedItemId] = useState(true);
  const [quizId, setQuizId] = useState();

  const [checked, setChecked] = React.useState(true);

  const router = useRouter();

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

  // const MyButton = forwardRef(({ onClick, href }, ref) => {
  //   return (
  //     <a href={href} onClick={onClick} ref={ref}>
  //       Click Me
  //     </a>
  //   )
  // })

  const { quizStarted } = useAppSelector((state) => state.quiz);
  const dispatch = useAppDispatch();

  const handleQuizId = (e: any) => {
    let currentQuizId = e.currentTarget.id;
    setQuizId(currentQuizId);
    // router.push(`/user/course/${slug}/${quizId}`)
    router.push(
      {
        pathname: "/user/course/[slug]/[quizId]",
      },
      `/user/course/${slug}/${quizId}`,
      { shallow: true }
    );
    dispatch(getQuizByCode(slug, quizId));
    dispatch(resetState()); 
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
                          <ListItemButton id={_id} onClick={handleQuizId}>
                            {/* <Link href={`/user/course/${slug}/${quizId}`} replace> */}
                            <ListItemText primary={quizTitle} />
                            {/* </Link> */}
                          </ListItemButton>
                          {/* <Link  href={`/user/course/${slug}/${quizId}`} passHref>
                            <MyButton onClick={handleQuizId}/>
                          </Link> */}
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
