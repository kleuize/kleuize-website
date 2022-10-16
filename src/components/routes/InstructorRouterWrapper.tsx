import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRotateIconStyles } from "../../utils/RotetesIcon";
import { SyncOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";
import InstructorNav from "../nav/InstructorNav";
import { Paper } from "@mui/material";
import { Suspense } from "react";

const InstructorRouteWrapper = ({ children }: any) => {
  const classes = useRotateIconStyles();
  const [ok, setOk] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchInstructor();
  }, []);

  const fetchInstructor = async () => {
    try {
      const { data } = await axios.get("/api/current-instructor");
      console.log("INSTRUCTOR ROUTE => ", data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined className={classes.rotateIcon} />
      ) : (
        <Box sx={{ mt: 10 }}>
          <Box>
            <Box>
              <InstructorNav />
            </Box>
            <Suspense>
              <Paper
                sx={{
                  borderRadius: "unset",
                  boxShadow: "none",
                  backgroundColor: "#fafafa",
                  minHeight: "calc(100vh - 4rem)",
                  width: "calc(100vh-4rem)",
                  marginLeft: 30,
                }}
              >
                {children}
              </Paper>
            </Suspense>
          </Box>
        </Box>
      )}
    </>
  );
};

export default InstructorRouteWrapper;
