import { useContext, useState } from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
//3rd
import axios from "axios";
import { toast } from "react-toastify";
// @mui
import { alpha } from "@mui/material/styles";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  IconButton,
} from "@mui/material";
// routes
import { PATH_DASHBOARD } from "../../routes/paths";
//Context
import { UserContext } from "../../context/UserContext";
// components
import { MyAvatar } from "../MyAvatar";
import { MenuPopover } from "../MenuPopover";

// ------------------------------Routes-------------------------------------//

const MENU_OPTIONS_USER = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Profile",
    linkTo: PATH_DASHBOARD.user.root,
  },
  {
    label: "Settings",
    linkTo: PATH_DASHBOARD.user.account,
  },
];

const MENU_OPTIONS_INSTRUCTOR = [
  {
    label: "Home",
    linkTo: "/",
  },
  {
    label: "Profile",
    linkTo: PATH_DASHBOARD.instructor.root,
  },
  {
    label: "Settings",
    linkTo: PATH_DASHBOARD.instructor.root,
  },
];

const MENU_OPTIONS_NOTLOGGEDIN = [
  {
    label: "Login",
    linkTo: PATH_DASHBOARD.auth.login,
  },
  {
    label: "Register",
    linkTo: PATH_DASHBOARD.auth.register,
  },
];

// ------------------------------Component-------------------------------------//

export default function AccountPopover() {
  const router = useRouter();
  const [open, setOpen] = useState<any>(null);
  const { state, dispatch } = useContext(UserContext);
  const { user } = state;

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    dispatch({
      type: "LOGOUT",
    });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };

  // ------------------------------IsUserActive-------------------------------------//

  const IsUserActive = () => {
    return (
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 0.5,
          ml: 2.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS_USER.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    );
  };

  // ------------------------------IsInstructorActive-------------------------------------//

  const IsInstructorActive = () => {
    return (
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 0.5,
          ml: 2.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: "dashed" }} />
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS_INSTRUCTOR.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>
        <Divider sx={{ borderStyle: "dashed" }} />
        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    );
  };

  // ------------------------------NotLoggedIn-------------------------------------//

  const NotLoggedIn = () => {
    return (
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 0.5,
          ml: 2.75,
          "& .MuiMenuItem-root": {
            typography: "body2",
            borderRadius: 0.75,
          },
        }}
      >
        <Divider sx={{ borderStyle: "dashed" }} />
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS_NOTLOGGEDIN.map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>
        <Divider sx={{ borderStyle: "dashed" }} />
      </MenuPopover>
    );
  };

  // ------------------------------TSX-------------------------------------//

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme: any) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButton>
      {user ? (
        <>
          <IsUserActive />
          {user && user.role && user.role.includes("Instructor") ? (
            <IsInstructorActive />
          ) : (
            <IsUserActive />
          )}
        </>
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
}
