import { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";

const InstructorNav = () => {
  const [current, setCurrent] = useState<string>("");

  useEffect(() => {
    typeof navigator !== "undefined" && setCurrent(window.location.pathname);
  }, [typeof navigator !== "undefined" && window.location.pathname]);

  return (
    <Box className="nav flex-column nav-pills">
      <Link href="/instructor">
        <a className={`nav-link ${current === "/instructor" && "active"}`}>
          Dashboard
        </a>
      </Link>
      <Link href="/instructor/course/create">
        <a
          className={`nav-link ${
            current === "/instructor/course/create" && "active"
          }`}
        >
          Course Create
        </a>
      </Link>
      <Link href="/instructor/revenue">
        <a
          className={`nav-link ${
            current === "/instructor/revenue" && "active"
          }`}
        >
          Revenue
        </a>
      </Link>
    </Box>
  );
};

export default InstructorNav;
