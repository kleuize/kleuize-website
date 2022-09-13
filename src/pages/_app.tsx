import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResponsiveAppBar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer position="top-center" />
      <ResponsiveAppBar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
