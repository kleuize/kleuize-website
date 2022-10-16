import Link from "next/link";
import Image from "next/image";
import type { NextPage } from "next";
import Box from "@mui/material/Box";
import {
  Drawer,
  Typography,
  Avatar,
  List,
  Toolbar,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  MenuList,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useResponsive } from "../../hooks/useResponsive";
import { useState } from "react";

const drawerWidth = 280;

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: "white",
}));

const UserNav: NextPage = () => {
  const [values, setValues] = useState({
    name: "Enes Ünlüer",
    role: "Öğrenci",
    email: "ensunluer@gmail.com",
    picture: "",
  });
  const [openSideBar, setOpenSideBar] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handleDrawerToggle = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          marginTop: 10,
          maxHeight: 550,
          backgroundColor: "antiquewhite",
          marginLeft: 2,
          borderRadius: 5,
          padding: 2,
        },
      }}
    >
      <Toolbar />
      <AccountStyle>
        <Avatar src={values.picture} alt="photoURL" />
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
            {values.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {values.email}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.primary", mt: 0.1 }}>
            {values.role}
          </Typography>
        </Box>
      </AccountStyle>
      <Box
        sx={{
          mt: 3,
        }}
      >
        <List
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Link href="/instructor">
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>
          <Link href="/instructor/course/create">
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemText>Yeni Kurs</ListItemText>
            </ListItemButton>
          </Link>
          <Link href="/instructor/revenue">
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemText>Ödemeler</ListItemText>
            </ListItemButton>
          </Link>
        </List>
      </Box>
    </Drawer>
  );
};

export default UserNav;
