import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveAppBar from "../components/navbar/ResponsiveAppBar";
import { UserProvider } from "./../context/UserContext";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Link from "next/link";
import { Typography, Stack } from "@mui/material";
//Component
import GlobalStyles from "@mui/material/GlobalStyles";
import ThemeProvider from "../theme";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Kleuize
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <UserProvider>
          <ToastContainer position="top-center" />
          <ResponsiveAppBar />
          <Component {...pageProps} />
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Copyright sx={{ mt: 5 }} />
          </Stack>
        </UserProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
