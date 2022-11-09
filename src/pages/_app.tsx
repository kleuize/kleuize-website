//types
import type { AppProps } from "next/app";
import { NextPageWithLayout } from "../types";
//toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
//ctx
import { CompletedQuizContextProvider } from "../context/CompletedQuiz";
import { UserProvider } from "./../context/UserContext";
//redux
import { Provider } from "react-redux";
import { store } from "../store/store";
//theme
import ThemeProvider from "../theme";
//component
import ResponsiveAppBar from "../components/navbar/ResponsiveAppBar";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <UserProvider>
          <CompletedQuizContextProvider>
            <ToastContainer position="top-center" />
            <ResponsiveAppBar />
            {getLayout(<Component {...pageProps} />)}
          </CompletedQuizContextProvider>
        </UserProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
