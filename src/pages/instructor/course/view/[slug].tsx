import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import InstructorRouteWrapper from "../../../../components/routes/InstructorRouterWrapper";
import axios from "axios";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

const CourseView: NextPage = () => {
  const [course, setCourse] = useState({});
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse()
  }, [slug]);

  const loadCourse = async () => {
    const {data} = await axios.get(`/api/course/${slug}`)
    setCourse(data);
  };
  return (
    <InstructorRouteWrapper>
      <Container>
        <Box>
          <Typography> View {slug}</Typography>
        </Box>
      </Container>
    </InstructorRouteWrapper>
  );
};

export default CourseView;
