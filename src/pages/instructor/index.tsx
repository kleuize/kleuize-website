import { useState, useEffect, Fragment } from "react";
//@types-next
import { NextPageWithLayout } from "../../types";
//3rd
import axios from "axios";
//@mui
import Grid from "@mui/material/Grid";
//components
import Page from "../../components/Page";
import InstructorLayout from "../../components/layout/InstructorLayout";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { InstructorCard } from "../../components/cards/InstructorCard";

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
    <>
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
    </>
  );
};
export default InstructorIndex;

InstructorIndex.getLayout = function getLayout(page: React.ReactElement) {
  return <InstructorLayout>{page}</InstructorLayout>;
};

// return (
//   <InstructorRouteWrapper>
//     <Container
//       component="main"
//       maxWidth="lg"
//       sx={{ display: "flex", flexDirection: "row", mt: 3 }}
//     >
//       <Grid container spacing={2}>
//         {courses &&
//           courses.map((course) => (
//             <Grid item xs={12} sm={6} md={3}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="200"
//                   image={course.image ? course.image.Location : "/course.png"}
//                 />
//                 <CardContent>
//                   <Link href={`/instructor/course/view/${course.slug}`}>
//                     <Typography variant="h5"> {course.name}</Typography>
//                   </Link>
//                   <Typography variant="body2">
//                     {course.lessons.length} Lessons
//                   </Typography>
//                   <Box>
//                     {course.lessons.length < 5 ? (
//                       <p className="text-warning">
//                         At least 5 lessons are required to publish a course
//                       </p>
//                     ) : course.published ? (
//                       <p className="text-success">
//                         Your course is live in the marketplace
//                       </p>
//                     ) : (
//                       <p className="text-success">
//                         Your course is ready to be published
//                       </p>
//                     )}
//                   </Box>
//                   <CardActions>
//                     {course.published ? (
//                       <Tooltip title="Published">
//                         <Button
//                           size="small"
//                           variant="contained"
//                           color="success"
//                         >
//                           Yayınlandı
//                         </Button>
//                       </Tooltip>
//                     ) : (
//                       <Tooltip title="Unpublished">
//                         <Button
//                           size="small"
//                           variant="contained"
//                           color="error"
//                         >
//                           Yayınlanmadı
//                         </Button>
//                       </Tooltip>
//                     )}
//                   </CardActions>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//       </Grid>
//     </Container>
//   </InstructorRouteWrapper>
// );
