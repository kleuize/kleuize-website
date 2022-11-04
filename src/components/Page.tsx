import { forwardRef } from "react";
// next
import Head from "next/head";
// @mui
import { Box } from "@mui/material";

type Page = {
  children: React.ReactNode;
  title: string;
  meta?: React.ReactNode;
};
// eslint-disable-next-line react/display-name
const Page = forwardRef(
  ({ children, title = "", meta, ...other }: Page, ref) => (
    <>
      <Head>
        <title>{`${title} | Kleuize`}</title>
        {meta}
      </Head>

      {/* <Box ref={ref} {...other}> */}
        {children}
      {/* </Box> */}
    </>
  )
);

export default Page;
