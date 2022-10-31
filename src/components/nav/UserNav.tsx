import { useState } from "react";
//Next
import Link from "next/link";
//paths
import { PATH_DASHBOARD } from "../../routes/paths";
//@mui
import MuiDrawer from "@mui/material/Drawer";
import {
  Box,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { styled, Theme, CSSObject } from "@mui/material/styles";
//icons
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PlayLessonSharpIcon from "@mui/icons-material/PlayLessonSharp";
import GroupAddSharpIcon from "@mui/icons-material/GroupAddSharp";
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";

const drawerWidth = 240;

const USER_LINK = [
  {
    label: "Kurslarım",
    linkTo: PATH_DASHBOARD.user.root,
    icon: PlayLessonSharpIcon,
  },
  {
    label: "Profil",
    linkTo: PATH_DASHBOARD.user.account,
    icon: AccountCircleSharpIcon,
  },
  {
    label: "Ayarlar",
    linkTo: PATH_DASHBOARD.user.setting,
    icon: SettingsSharpIcon,
  },
  {
    label: "Eğitmen ol",
    linkTo: PATH_DASHBOARD.user.becomeInstructor,
    icon: GroupAddSharpIcon,
  },
];

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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
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

const UserNav = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box display="flex">
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
              {USER_LINK.map((option) => (
                <ListItem
                  key={option.label}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <Link key={option.label} href={option.linkTo} passHref>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        <option.icon />
                      </ListItemIcon>
                      <ListItemText
                        primary={option.label}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default UserNav;
