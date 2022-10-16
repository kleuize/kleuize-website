import { useState, useEffect } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { Drawer, Toolbar, Button } from "@mui/material";
import { useRouter } from "next/router";

const drawerWidth = 240;

const InstructorNav = () => {
  const [current, setCurrent] = useState<string>("");
  const [value, setValue] = useState<number>(0);

  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    //@ts-ignore
    typeof window === "undefined" && setCurrent(window.location.pathname);
    //@ts-ignore
  }, [typeof window === "undefined" && window.location.pathname]);
  //   useEffect(() => {
  //     typeof navigator !== "undefined" && setValue(window.location.pathname);
  //   }, [typeof navigator !== "undefined" && window.location.pathname]);

  const active = window.location.pathname === "/instructor" ? "blue" : "red";

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            mt: 10,
            borderRadius: 5,

            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
            },
          }}
        >
          <Toolbar />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Link href="/instructor">
            <a className={`nav-link ${current === "/instructor" && "active"}`}>
              Dashboard
            </a> */}
            <Button
              onClick={(e) => {
                e.stopPropagation();
                router.push("/instructor");
              }}
            >
              Dashboard
            </Button>
            {/* </Link> */}
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
        </Drawer>
      </Box>
    </nav>
  );
};

export default InstructorNav;
