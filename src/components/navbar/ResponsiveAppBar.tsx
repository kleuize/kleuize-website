//next
import Link from "next/link";
import Image from "next/image";
//@mui
import { Box, Stack, AppBar, Toolbar } from "@mui/material";
//component
import AccountPopover from "./AccountPopover";

const ResponsiveAppBar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "white",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          minHeight: "100% !important",
          px: { lg: 5 },
          height: 60,
        }}
      >
        <Box>
          <Link href={"/"}>
            <Image src="/kleuize.svg" alt="logo" width={150} height={25} />
          </Link>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
          sx={{ mr: 2 }}
        >
          <AccountPopover />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default ResponsiveAppBar;
