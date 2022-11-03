import { useState, useEffect, Fragment } from "react";
//@types-next
import { NextPageWithLayout } from "../../types";
//3rd
import axios from "axios";
//@mui
import Grid from "@mui/material/Grid";
//components
import InstructorLayout from "../../components/layout/InstructorLayout";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { InstructorCard } from "../../components/cards/InstructorCard";
import Page from "../../components/Page";

interface ICoursesProps {
  _id: any;
  image: any;
  lessons: any;
  slug: any;
  name: any;
  published: any;
}
const InstructorIndex: NextPageWithLayout = () => {
  const [courses, setCourses] = useState<ICoursesProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
    setLoading(false);
  };

  return (
    <Page title="Eğitimci Paneli">
      {loading && <LoadingSpinner />}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop={10}
        marginLeft={2}
        marginRight={2}
      >
        <Grid item container spacing={3}>
          {courses &&
            courses.map((course) => (
              <Fragment key={course._id}>
                <InstructorCard course={course} />
              </Fragment>
            ))}
        </Grid>
      </Grid>
    </Page>
  );
};
export default InstructorIndex;

InstructorIndex.getLayout = function getLayout(page: React.ReactElement) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
