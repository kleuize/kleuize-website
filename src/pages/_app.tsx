import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveAppBar from "../components/Navbar";
import { UserProvider } from "./../context/UserContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ToastContainer position="top-center" />
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
