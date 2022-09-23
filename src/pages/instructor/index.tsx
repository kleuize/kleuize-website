import type { NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import InstructorRouteWrapper from "../../components/routes/InstructorRouterWrapper";
import { Avatar, Container, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid";
import { CheckCircleOutlined, HighlightOffOutlined } from "@mui/icons-material";
import Box from "@mui/material/Box";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface ICoursesProps {
  image: any;
  lessons: any;
  slug: any;
  name: any;
  published: any;
}
const InstructorIndex: NextPage = () => {
  const [courses, setCourses] = useState<ICoursesProps[]>([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };

  return (
    <InstructorRouteWrapper>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "row", mt: 3 }}
      >
        <Grid container spacing={2}>
          {courses &&
            courses.map((course) => (
              <Grid item xs={12} sm={6} md={3}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={course.image ? course.image.Location : "/course.png"}
                  />
                  <CardContent>
                    <Link href={`/instructor/course/view/${course.slug}`}>
                      <Typography variant="h5"> {course.name}</Typography>
                    </Link>
                    <Typography variant="body2">
                      {course.lessons.length} Lessons
                    </Typography>
                    <Box>
                      {course.lessons.length < 5 ? (
                        <p className="text-warning">
                          At least 5 lessons are required to publish a course
                        </p>
                      ) : course.published ? (
                        <p className="text-success">
                          Your course is live in the marketplace
                        </p>
                      ) : (
                        <p className="text-success">
                          Your course is ready to be published
                        </p>
                      )}
                    </Box>
                    <CardActions>
                      {course.published ? (
                        <Tooltip title="Published">
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                          >
                            Yayınlandı
                          </Button>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Unpublished">
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                          >
                            Yayınlanmadı
                          </Button>
                        </Tooltip>
                      )}
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </InstructorRouteWrapper>
  );
};
export default InstructorIndex;
