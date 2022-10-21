import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Container from "@mui/material/Container";
import { Avatar, Box, Stack } from "@mui/material";
import { UserRouterWrapper } from "../../components/layout/UserLayout";
import { PlayCircleOutlined, SyncOutlined } from "@mui/icons-material";
import { useRotateIconStyles } from "../../utils/RotetesIcon";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";
import Link from "next/link";

const UserIndex = () => {
  const classes = useRotateIconStyles();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(UserContext);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-courses");
      setCourses(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <UserRouterWrapper>
      <Container
        component="main"
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "row", mt: 10 }}
      >
        {loading && <SyncOutlined className={classes.rotateIcon} />}
        <Grid container spacing={2} >
          {courses &&
            courses.map((course) => (
              <Grid item xs={12} sm={6} md={3}>
                <Stack
                  key={course._id}
                  sx={{
                    bgColor: "grey",
                    border: 0.5,
                    mt: 0.5,
                    p: 1.2,
                    borderRadius: 5,
                  }}
                >
                  <Avatar
                    sx={{ width: 56, height: 56 }}
                    src={course.image ? course.image.Location : "/course.png"}
                  />
                  <div className="media-body pl-2">
                    <div className="row">
                      <div className="col">
                        <Link
                          href={`/user/course/${course.slug}`}
                          className="pointer"
                        >
                          <a>
                            <h5 className="mt-2 text-primary">{course.name}</h5>
                          </a>
                        </Link>
                        <p style={{ marginTop: "-10px" }}>
                          {course.lessons.length} lessons
                        </p>
                        <p
                          className="text-muted"
                          style={{ marginTop: "-15px", fontSize: "12px" }}
                        >
                          By {course.instructor.name}
                        </p>
                      </div>
                      <div className="col-md-3 mt-3 text-center">
                        <Link href={`/user/course/${course.slug}`}>
                          <a>
                            <PlayCircleOutlined className="h2 pointer text-primary" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Stack>
              </Grid>
            ))}
        </Grid>
      </Container>
    </UserRouterWrapper>
  );
};

export default UserIndex;
