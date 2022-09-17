import Link from "next/link";
import type { NextPage } from "next";
import Box from "@mui/material/Box";


const UserNav: NextPage = () => {
  return (
    <Box className="nav flex-column nav-pills mt-2">
      <Link href="/user">
        <a className="nav-link active">Dashboard</a>
      </Link>
    </Box>
  );
};

export default UserNav;
