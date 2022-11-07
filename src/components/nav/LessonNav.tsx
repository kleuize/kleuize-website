import React, { forwardRef, useState } from "react";
//UI
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
//next
import { useRouter } from "next/router";
//ctx
import { getQuizByCode, resetQuiz } from "../../store/quiz/quiz-slice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
//@mui
import MuiDrawer from "@mui/material/Drawer";
import {
  Divider,
  List,
  Stack,
  Checkbox,
  IconButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { styled, Theme, CSSObject } from "@mui/material/styles";
//icons
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useCompletedQuiz } from "../../context/CompletedQuiz";

const drawerWidth = 330;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(5)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const LessonNav = ({ lessons, slug }: any) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);
  const [openedItemId, setOpenedItemId] = useState<boolean>(true);
  const [quizId, setQuizId] = useState();
  const [checked, setChecked] = useState(true);

  const { setClickedQuizIndex } = useCompletedQuiz();
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };

  const handleClick = (e: any) => {
    let clickedItemId = e.currentTarget.id;
    if (openedItemId === clickedItemId) {
      //@ts-ignore
      setOpenedItemId("");
    } else {
      setOpenedItemId(clickedItemId);
    }
  };

  const handleQuizId = (e: React.MouseEvent<HTMLElement>, index: number) => {
    let currentQuizId: any = e.currentTarget.id;
    setQuizId(currentQuizId);
    setClickedQuizIndex(index)
    router.push(
      {
        pathname: "/user/course/[slug]/[quizId]",
      },
      `/user/course/${slug}/${quizId}`,
      { shallow: true }
    );
    dispatch(getQuizByCode(slug, quizId));
    dispatch(resetQuiz());
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader />
      <Box>
        <List
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <>
            <IconButton
              disableRipple
              onClick={handleDrawerOpen}
              sx={{
                color: "#08104D",
                transition: (theme) =>
                  theme.transitions.create("transform", {
                    duration: theme.transitions.duration.shorter,
                  }),
                ...(open && {
                  transform: "rotate(180deg)",
                }),
              }}
            >
              <ChevronRightIcon />
            </IconButton>
            <Divider />
            <Box>
              {open ? (
                <>
                  {lessons?.map(
                    ({ lessonTitle, quiz, _id }: any, index: number) => (
                      <div key={_id}>
                        {quiz != null ? (
                          <>
                            <ListItemButton
                              disabled={!open}
                              id={_id}
                              onClick={handleClick}
                              sx={{
                                minHeight: 48,
                                justifyContent: open ? "initial" : "center",
                                px: 2.5,
                              }}
                            >
                              {openedItemId === _id ? (
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                  }}
                                >
                                  <ExpandLess />
                                </ListItemIcon>
                              ) : (
                                <ListItemIcon
                                  sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : "auto",
                                    justifyContent: "center",
                                  }}
                                >
                                  <ExpandMore />
                                </ListItemIcon>
                              )}
                              {/* <ListItemText
                                primary={`Ders ${index + 1}: ${lessonTitle}`}
                              /> */}
                              <Typography variant="body2">{`Ders ${
                                index + 1
                              }: ${lessonTitle}`}</Typography>
                            </ListItemButton>
                            <Divider />
                            <Collapse
                              in={openedItemId === _id}
                              timeout="auto"
                              unmountOnExit
                            >
                              {openedItemId &&
                                quiz.map(({ _id, quizTitle }: any) => (
                                  <Stack
                                    key={_id}
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <ListItemButton
                                      id={_id}
                                      onClick={(event) => handleQuizId(event, index)}
                                    >
                                      <Typography
                                        variant="body2"
                                        sx={{ ml: 2 }}
                                      >
                                        {quizTitle}
                                      </Typography>
                                    </ListItemButton>
                                    <Checkbox
                                      checked={false}
                                      inputProps={{
                                        "aria-label": "controlled",
                                      }}
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
                    )
                  )}
                </>
              ) : null}
            </Box>
          </>
        </List>
      </Box>
    </Drawer>
  );
};
