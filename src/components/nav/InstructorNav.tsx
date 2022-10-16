import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { styled } from "@mui/material/styles";
import {
  Drawer,
  Toolbar,
  Button,
  Avatar,
  Typography,
  Box,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

const drawerWidth = 260;

const AccountStyle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: "white",
}));

const InstructorNav = () => {
  const [current, setCurrent] = useState<string>("");
  const [value, setValue] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const [values, setValues] = useState({
    name: "Enes Ünlüer",
    role: "Eğitmen",
    email: "ensunluer@gmail.com",
    picture: "",
  });

  const router = useRouter();

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <nav>
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
    </nav>
  );
};

export default InstructorNav;
