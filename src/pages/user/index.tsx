import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Container from "@mui/material/Container";
import { Avatar, Box, Stack } from "@mui/material";
import { UserRouterWrapper } from "../../components/layout/UserLayout";
import { PlayCircleOutlined, SyncOutlined } from "@mui/icons-material";
import { useRotateIconStyles } from "../../utils/RotetesIcon";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
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

  const JumbotronStyle = styled("div")(({ theme }) => ({
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 5,
    width: "100%",
    height: 60,
    marginTop: 20,
    marginLeft: 20,
  }));

  return (
    <Container>
      <UserRouterWrapper>
        {loading && <SyncOutlined className={classes.rotateIcon} />}
        <JumbotronStyle>
          <Typography> Öğrenci Paneli</Typography>
        </JumbotronStyle>
        <Box component="main" sx={{ flexGrow: 1, p: 3, flexDirection: "row" }}>
          {courses &&
            courses.map((course) => (
              <Stack
                key={course._id}
                sx={{ bgColor: "grey", border: 0.5, mt: 0.5, p: 1.2, borderRadius: 5 }}
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
            ))}
        </Box>
      </UserRouterWrapper>
    </Container>
  );
};

export default UserIndex;
