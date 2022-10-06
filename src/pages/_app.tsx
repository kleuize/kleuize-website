import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveAppBar from "../components/Navbar";
import { UserProvider } from "./../context/UserContext";
import { Provider } from "react-redux";

import { store } from "../store/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UserProvider>
        <ToastContainer position="top-center" />
        <ResponsiveAppBar />
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
