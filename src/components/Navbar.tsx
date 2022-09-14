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

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      active: React.CSSProperties["color"];
    };
  }
  interface ThemeOptions {
    status: {
      active: React.CSSProperties["color"];
    };
  }
}

const pages = ["About", "Lecture", "Contact"];

const ResponsiveAppBar = () => {
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

  const theme = createTheme({
    status: {
      active: "#08104d",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "white", borderRadius: 5 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: "25%",
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: ".3rem",
                color: "#08104d",
                textDecoration: "none",
              }}
            >
              <span className={styles.logo}>
                <Image src="/kleuize.svg" alt="logo" width={150} height={25} />
              </span>
            </Typography>

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
                {pages.map((page) => (
                  <Link
                    href={`${page.toLowerCase()}`}
                    style={{ textDecoration: "none" }}
                  >
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 5,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                textDecoration: "none",
              }}
            >
              <span className={styles.logo}>
                <Image src="/kleuize.svg" alt="logo" width={72} height={16} />
              </span>
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex", color: "#08104d" },
              }}
            >
              {pages.map((page) => (
                <Link
                  href={`${page.toLowerCase()}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "#08104d", display: "block" }}
                  >
                    {page}
                  </Button>
                </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: "#08104d" }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", color: "#08104d" }}
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link href="/profile" style={{ textDecoration: "none" }}>
                        Account
                      </Link>
                    </Typography>
                    <Typography textAlign="center">
                      <Button onClick={logout}>Logout</Button>
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link href="/login" style={{ textDecoration: "none" }}>
                        Login
                      </Link>
                    </Typography>
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
