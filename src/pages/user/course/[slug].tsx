import { Typography, Box, Button } from "@mui/material";
import { StudentRouterWrapper } from "../../../components/routes/StudentRouterWrapper";
import { useRouter } from "next/router";

const SingleCourse = () => {
  const router = useRouter();

  return (
    <StudentRouterWrapper>
      <Box>
        <Button>Test</Button>
      </Box>
      <Typography>test</Typography>
    </StudentRouterWrapper>
  );
};

export default SingleCourse;
