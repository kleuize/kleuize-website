import { useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRotateIconStyles } from "../../utils/RotetesIcon";
import { SyncOutlined } from "@mui/icons-material";
import { LessonNav } from "../nav/LessonNav";
import { Box, Paper } from "@mui/material";
import { ICourseViewProps } from "../../types";

export const StudentRouterWrapper = ({ children, showNav = true, data}: any) => {
  const classes = useRotateIconStyles();
  // state
  const [ok, setOk] = useState(false);
  const [course, setCourse] = useState<any>({});
  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course;
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  console.log(course); 

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      //   console.log(data);
      if (data.ok) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <SyncOutlined className={classes.rotateIcon} />
      ) : (
        <Box sx={{ mt: 10 }}>
          <Box>
            <LessonNav lessons={course.lessons} />
          </Box>
          <Suspense>
            <Paper
              sx={{
                borderRadius: "unset",
                boxShadow: "none",
                // backgroundColor: "#fafafa",
                minHeight: "calc(100vh - 4rem)",
                marginLeft: 40,
              }}
            >
              {children}
            </Paper>
          </Suspense>
        </Box>
      )}
    </>
  );
};
