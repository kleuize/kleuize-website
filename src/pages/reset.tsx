import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";

// import { Link, useNavigate } from "react-router-dom";
// import { useAuthState } from "react-firebase-hooks/auth";
// import Spinner from "../../components/spinner";
// import { auth, sendPasswordReset } from "../../firebase";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a color="inherit" href="/">
        Kleuize{" "}
      </a>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();

const reset: NextPage = () => {
  //   const [email, setEmail] = useState("");
  //   const [user, loading] = useAuthState(auth);
  //   const navigate = useNavigate();
  //   useEffect(() => {
  //     if (loading) return;
  //     <Spinner />;
  //     if (user) navigate("/dashboard");
  //   }, [user, loading]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              //   value={email}
              //   onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              //   onClick={() => sendPasswordReset(email)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Password Reset Email
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/login">{"Do you have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default reset;
