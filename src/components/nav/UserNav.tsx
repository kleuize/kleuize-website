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

const DRAWER_WIDTH = 280;

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: "white",
}));

const DrawerLayout = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 0),
  backgroundColor: theme.palette.grey[500],
  width: DRAWER_WIDTH,
  height: 500,
  marginTop: 20,
  borderRadius: 5,
}));

const MenuStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: "white",
  marginTop: 20,
}));

const UserNav: NextPage = () => {
  const [values, setValues] = useState({
    name: "Enes Ünlüer",
    role: "Öğrenci",
    email: "ensunluer@gmail.com",
    picture: "",
  });
  const [openSideBar, setOpenSideBar] = useState(true);

  const handleDrawerToggle = () => {
    setOpenSideBar(!openSideBar);
  };

  const isDesktop = useResponsive("up");

  const renderContent = (
    <Box
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ mb: 5, mx: 2.5 }}>
        <AccountStyle>
          <Avatar src={values.picture} alt="photoURL" />
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
              {values.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {values.email}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {values.role}
            </Typography>
          </Box>
        </AccountStyle>
        <MenuStyle>
          <MenuList>
            <MenuItem>
              <ListItemText>Dashboard</ListItemText>
            </MenuItem>
          </MenuList>
        </MenuStyle>
      </Box>
    </Box>
  );
  return (
    <RootStyle>
      {/* {!isDesktop && (
        <Drawer
          open={openSideBar}
          onClose={handleDrawerToggle}
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: DRAWER_WIDTH,
              boxSizing: "border-box",
            },
          }}
        >
          {renderContent}
        </Drawer>
      )} */}

      <DrawerLayout>{renderContent}</DrawerLayout>
    </RootStyle>
  );
};

export default UserNav;
