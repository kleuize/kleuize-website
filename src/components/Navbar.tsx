import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      active: React.CSSProperties["color"];
    };
    button: {
      color: React.CSSProperties["color"];
    };
  }
  interface ThemeOptions {
    status: {
      active: React.CSSProperties["color"];
    };
    button: {
      color: React.CSSProperties["color"];
    };
  }
}

const theme = createTheme({
  status: {
    active: "#08104d",
  },
  button: {
    color: "#08104d",
  },
});

const ResponsiveAppBar = () => {
  const [current, setCurrent] = useState<string>("");
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;
  const router = useRouter();
  const logout = async () => {
    dispatch({
      type: "LOGOUT",
    });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Box
              sx={{
                mr: "25%",
                display: { xs: "none", md: "flex" },
              }}
            >
              <Link href={"/"}>
                <Image src="/kleuize.svg" alt="logo" width={150} height={25} />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                  color: "#08104d",
                }}
              >
                {user ? (
                  <MenuItem>
                    <Link href="/course">
                      <MenuItem key="course">
                        <Typography
                          textAlign="center"
                          sx={{ color: "#08104d" }}
                        >
                          Kurslar
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link href="/about">
                      <MenuItem key="about">
                        <Typography
                          textAlign="center"
                          sx={{ color: "#08104d" }}
                        >
                          Hakkımızda
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link href="/contact">
                      <MenuItem key="contact">
                        <Typography
                          textAlign="center"
                          sx={{ color: "#08104d" }}
                        >
                          İletişim
                        </Typography>
                      </MenuItem>
                    </Link>
                    {user && user.role && user.role.includes("Instructor") ? (
                      <Link href="/instructor/course/create">
                        <MenuItem key="create-course">
                          <Typography
                            textAlign="center"
                            sx={{ color: "#08104d" }}
                          >
                            Yeni Kurs Oluştur
                          </Typography>
                        </MenuItem>
                      </Link>
                    ) : (
                      <Link href="/user/become-instructor">
                        <MenuItem key="become-instructor">
                          <Typography
                            textAlign="center"
                            sx={{ color: "#08104d" }}
                          >
                            Eğitmen Ol
                          </Typography>
                        </MenuItem>
                      </Link>
                    )}
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Link href="/course">
                      <MenuItem key="course">
                        <Typography
                          textAlign="center"
                          sx={{ color: "#08104d" }}
                        >
                          Kurslar
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link href="/about">
                      <MenuItem key="about">
                        <Typography
                          textAlign="center"
                          sx={{ color: "#08104d" }}
                        >
                          Hakkımızda
                        </Typography>
                      </MenuItem>
                    </Link>
                    <Link href="/contact">
                      <MenuItem key="contact">
                        <Typography
                          textAlign="center"
                          sx={{ color: "#08104d" }}
                        >
                          İletişim
                        </Typography>
                      </MenuItem>
                    </Link>
                  </MenuItem>
                )}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
              }}
            >
              <Link href={"/"}>
                <Image src="/kleuize.svg" alt="logo" width={150} height={25} />
              </Link>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {user ? (
                <>
                  <Link href="/course">
                    <Button sx={{ color: "#08104d" }}>Kurslar</Button>
                  </Link>
                  <Link href="/about">
                    <Button sx={{ color: "#08104d" }}>Hakkımızda</Button>
                  </Link>
                  <Link href="/contact">
                    <Button sx={{ color: "#08104d" }}>İletişim</Button>
                  </Link>
                  {user && user.role && user.role.includes("Instructor") ? (
                    <Link href="/instructor/course/create">
                      <Button sx={{ color: "#08104d" }}>Yeni Kurs</Button>
                    </Link>
                  ) : (
                    <Link href="/user/become-instructor">
                      <Button sx={{ color: "#08104d" }}>Eğitmen Ol</Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link href="/course">
                    <Button sx={{ color: "#08104d" }}>Kurslar</Button>
                  </Link>
                  <Link href="/about">
                    <Button sx={{ color: "#08104d" }}>Hakkımızda</Button>
                  </Link>
                  <Link href="/contact">
                    <Button sx={{ color: "#08104d" }}>İletişim</Button>
                  </Link>
                </>
              )}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "#08104d" }}
                >
                  <Avatar alt="avatar" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", display: "flex", flexDirection: "column" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user ? (
                  <MenuItem>
                    {user && user.role && user.role.includes("Instructor") ? (
                      <MenuItem>
                        <MenuItem
                          onClick={(e: any) => setCurrent(e.key)}
                          color="#08104d"
                        >
                          <AssignmentTurnedInOutlinedIcon />
                          <Link href="/instructor">Dashboard</Link>
                        </MenuItem>
                        <MenuItem onClick={logout} color="#EF5D51">
                          Logout
                        </MenuItem>
                      </MenuItem>
                    ) : (
                      <MenuItem>
                        <MenuItem
                          onClick={(e: any) => setCurrent(e.key)}
                          color="#08104d"
                        >
                          <GroupOutlinedIcon />
                          <Link href="/user">Dashboard</Link>
                        </MenuItem>
                        <MenuItem onClick={logout} color="#EF5D51">
                          Logout
                        </MenuItem>
                      </MenuItem>
                    )}
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <MenuItem
                      onClick={(e: any) => setCurrent(e.key)}
                      color="#08104d"
                    >
                      <Link href="/login">Login</Link>
                    </MenuItem>
                    <MenuItem
                      onClick={(e: any) => setCurrent(e.key)}
                      color="#08104d"
                    >
                      <Link href="/register">Register</Link>
                    </MenuItem>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
