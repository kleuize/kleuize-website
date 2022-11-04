import React, { forwardRef, useState } from "react";
//UI
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
//Icon
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
//Component
import MuiDrawer from "@mui/material/Drawer";
import {
  Divider,
  List,
  Stack,
  Checkbox,
  IconButton,
  ListItemIcon,
} from "@mui/material";
import Link from "next/link";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getQuizByCode, resetQuiz } from "../../store/quiz/quiz-slice";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

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
  const [openedItemId, setOpenedItemId] = useState(true);
  const [quizId, setQuizId] = useState();

  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

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

  // const { quizStarted } = useAppSelector((state) => state.quiz);
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
                lineHeight: 0,
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
            <Box
              sx={{
                bgcolor: openedItemId
                  ? "rgba(41, 98, 174, 0.1)"
                  : "rgba(41, 98, 174, 0.2)",
              }}
            >
              {open ? (
                <>
                  {lessons?.map(
                    ({ lessonTitle, quiz, _id }: any, index: number) => (
                      <div>
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
                              <ListItemText
                                primary={`Ders ${index + 1}: ${lessonTitle}`}
                              />
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
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <ListItemButton
                                      id={_id}
                                      onClick={handleQuizId}
                                    >
                                      <ListItemText primary={quizTitle} />
                                    </ListItemButton>

                                    <Checkbox
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
