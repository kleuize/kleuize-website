import { useState, useEffect } from "react";
//next
import { useRouter } from "next/router";
import { ICourseViewProps, NextPageWithLayout } from "../../../../types";
//3rd
import axios from "axios";
import { toast } from "react-toastify";
//@mui
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
//components
import { AddLesson } from "../../../../components/lesson/AddLesson";
import { LessonAccordion } from "../../../../components/accordion/LessonAccordion";
import { InstructorCourseDetailsCard } from "../../../../components/cards/InstructorCourseDetailsCard";
import InstructorLayout from "../../../../components/layout/InstructorLayout";
import Page from "../../../../components/Page";

const CourseView: NextPageWithLayout = () => {
  const [course, setCourse] = useState<ICourseViewProps>({});
  const [visible, setVisible] = useState(false);
  const [students, setStudents] = useState(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  useEffect(() => {
    course && studentCount();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };

  const studentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    setStudents(data.length);
  };

  const handleUnpublish = async (
    e: React.FormEvent<HTMLFormElement>,
    courseId: any
  ) => {
    console.log(course._id);
    try {
      let answer = window.confirm(
        "Kursunuzu yayından kaldırdıktan sonra, kullanıcıların kaydolması mümkün olmayacaktır."
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data);
      toast("Kursunuz yayınlanmamış");
    } catch (error) {
      toast("Kurs yayınlanamadı. Yeniden deneyin");
    }
  };

  const handlePublish = async (
    e: React.FormEvent<HTMLFormElement>,
    courseId: any
  ) => {
    try {
      let answer = window.confirm(
        "Kursunuzu yayınladıktan sonra, kullanıcıların kaydolabilmesi için yayında olacak"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);
      toast("Tebrikler! Kursunuz yayınlandı.");
    } catch (error) {
      toast("Kurs yayınlanamadı. Yeniden deneyin");
    }
  };

  return (
    <Page title="Kurs Görünümü">
      <Grid
        container
        direction="column"
        justifyContent="center"
        marginTop={10}
        marginLeft={2}
        marginRight={2}
      >
        <Grid item>
          <InstructorCourseDetailsCard
            course={course}
            publish={(e: any) => handlePublish(e, course._id)}
            unPublish={(e: any) => handleUnpublish(e, course._id)}
            addLesson={() => setVisible(true)}
          />
        </Grid>
        <Grid item sx={{ mb: 2, mt: 2 }}>
          <Typography variant="body1" fontWeight="bold">
            Kurs İçeriği
          </Typography>
        </Grid>
        <Grid item>
          <AddLesson openModal={visible} closeModal={() => setVisible(false)} />
        </Grid>
        <LessonAccordion />
      </Grid>
    </Page>
  );
};

export default CourseView;

CourseView.getLayout = function getLayout(page: React.ReactElement) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
