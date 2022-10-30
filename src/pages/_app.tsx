import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveAppBar from "../components/navbar/ResponsiveAppBar";
import { UserProvider } from "./../context/UserContext";
import { Provider } from "react-redux";
import { store } from "../store/store";
//Component
import ThemeProvider from "../theme";
import { NextPageWithLayout } from "../types";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <ThemeProvider>
      <Provider store={store}>
        <UserProvider>
          <ToastContainer position="top-center" />
          <ResponsiveAppBar />
          <Component {...pageProps} />
        </UserProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
