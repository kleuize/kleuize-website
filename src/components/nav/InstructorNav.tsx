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
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import DataSaverOnSharpIcon from '@mui/icons-material/DataSaverOnSharp';
import ReceiptSharpIcon from '@mui/icons-material/ReceiptSharp';

const drawerWidth = 240;

const INSTRUCTOR_LINK = [
  {
    label: "Kurslarım",
    linkTo: PATH_DASHBOARD.instructor.root,
    icon: PlayLessonSharpIcon,
  },
  {
    label: "Yeni Kurs",
    linkTo: PATH_DASHBOARD.instructor.create,
    icon: DataSaverOnSharpIcon,
  },
  {
    label: "Profil",
    linkTo: PATH_DASHBOARD.instructor.account,
    icon: AccountCircleSharpIcon,
  },
  {
    label: "Ayarlar",
    linkTo: PATH_DASHBOARD.instructor.setting,
    icon: SettingsSharpIcon,
  },
  {
    label: "Ödemeler",
    linkTo: PATH_DASHBOARD.instructor.revenue,
    icon: ReceiptSharpIcon,
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

const InstructorNav = () => {
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
              {INSTRUCTOR_LINK.map((option) => (
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

export default InstructorNav;





//           >
//             <Link href="/instructor">
//               <ListItemButton
//                 selected={selectedIndex === 0}
//                 onClick={(event) => handleListItemClick(event, 0)}
//               >
//                 <ListItemText primary="Dashboard" />
//               </ListItemButton>
//             </Link>
//             <Link href="/instructor/course/create">
//               <ListItemButton
//                 selected={selectedIndex === 1}
//                 onClick={(event) => handleListItemClick(event, 1)}
//               >
//                 <ListItemText>Yeni Kurs</ListItemText>
//               </ListItemButton>
//             </Link>
//             <Link href="/instructor/revenue">
//               <ListItemButton
//                 selected={selectedIndex === 2}
//                 onClick={(event) => handleListItemClick(event, 2)}
//                 disabled
//               >
//                 <ListItemText>Ödemeler(Yakında)</ListItemText>
//               </ListItemButton>
//             </Link>
//           </List>
//         </Box>
//       </Drawer>
//     </nav>
//   );
// };

// export default InstructorNav;
