import type { NextPage } from "next";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import InstructorRouteWrapper from "../../components/routes/InstructorRouterWrapper";
import { Avatar, Tooltip, Typography } from "@mui/material";
import { CheckCircleOutlined, HighlightOffOutlined } from "@mui/icons-material";

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
      <Typography> Eğitimci Gösterge Paneli</Typography>
      {courses &&
        courses.map((course) => (
          <>
            <div className="media pt-2">
              <Avatar
                sx={{ width: 80, height: 80 }}
                src={course.image ? course.image.Location : "/course.png"}
              />

              <div className="media-body pl-2">
                <div className="row">
                  <div className="col">
                    <Link
                      href={`/instructor/course/view/${course.slug}`}
                      className="pointer"
                    >
                      <a className="mt-2 text-primary">
                        <h5 className="pt-2">{course.name}</h5>
                      </a>
                    </Link>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons.length} Lessons
                    </p>

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
                  </div>

                  <div className="col-md-3 mt-3 text-center">
                    {course.published ? (
                      <Tooltip title="Published">
                        <CheckCircleOutlined className="h5 pointer text-success" />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Unpublished">
                        <HighlightOffOutlined className="h5 pointer text-warning" />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </InstructorRouteWrapper>
  );
};
export default InstructorIndex;
