import { useEffect, useState, Suspense, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useRotateIconStyles } from "../../utils/RotetesIcon";
import { SyncOutlined } from "@mui/icons-material";
import { LessonNav } from "../nav/LessonNav";
import { Box, Paper } from "@mui/material";
import { ICourseViewProps } from "../../types";
import { UserContext } from "../../context/UserContext";
import Quiz from "../quizzes";
import { LoadingSpinner } from "../LoadingSpinner";

// export async function getServerSideProps({ query }: any) {
//   const { data } = await axios.get(
//     `${process.env.API}/user/course/${query.slug}`
//   );

//   console.log(data)
//   return {
//     props: {
//       course: data,
//     },
//   };
// }

export const StudentLayout = ({ children, showNav = true, data }: any) => {
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
        <LoadingSpinner />
      ) : (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box>
            <LessonNav
              course={course}
              lessons={course.lessons}
              slug={course.slug}
            />
          </Box>
          <Suspense>{children}</Suspense>
        </Box>
      )}
    </>
  );
};
