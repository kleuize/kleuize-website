import type { NextPage } from "next";
import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { EnhancedEncryptionRounded, SendToMobile, SyncOutlined } from "@mui/icons-material";
import { UserContext } from "../context/UserContext";
import { useRotateIconStyles } from "../styles/RotetesIcon";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a href="/"> Kleuize </a>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();

const Login: NextPage = () => {

  const classes = useRotateIconStyles();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    state: { user },
    dispatch,
  } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    //event handler for submitting the register form
    event.preventDefault(); //so page doesnt reload
    //now send all data to backend to save to db
    try {
      setLoading(true);
      console.table({ email, password });
      const { data } = await axios.post(`/api/login`, {
        email,
        password,
      });

      dispatch({
        type: "LOGIN",
        payload: data,
      });

      //localStorage
      window.localStorage.setItem("user", JSON.stringify(data));
      //redirect home page
      router.push("/");
      //gonna do the toast alert here
      toast.success("Registertation successful. please log in");

      setEmail("");
      setPassword("");
      setLoading(false);
    } catch (err: any) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              //   onClick={() => signInWithEmailAndPassword(email, password)}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!email || !password || loading}
            >
              {loading ? (
                <SyncOutlined className={classes.rotateIcon} />
              ) : (
                "Sign In"
              )}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href={"/reset"}>Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link href={"/register"}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
