import { useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
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
import { useRouter } from "next/router";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import { SyncOutlined } from "@mui/icons-material";
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
      <a color="inherit" href="/">
        Kleuize{" "}
      </a>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const theme = createTheme();

const Reset: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const classes = useRotateIconStyles();

  const {
    state: { user },
  } = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email for the secret code");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", {
        email,
        code,
        newPassword,
      });
      setEmail("");
      setCode("");
      setNewPassword("");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast(err.response.data);
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
            Forget Password
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={success ? handleResetPassword : handleSubmit}
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
            {success && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="text"
                  label="Enter secret code"
                  name="code"
                  autoFocus
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="New Password"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || !email}
            >
              {loading ? (
                <SyncOutlined className={classes.rotateIcon} />
              ) : (
                "Send Password Reset Email"
              )}
            </Button>

            <Grid container>
              <Grid item>
                <Link href="/login">{"Do you have an account? Sign In"}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Reset;
