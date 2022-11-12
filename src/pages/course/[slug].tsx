import { useState, useEffect, useContext } from "react";
//next
import { useRouter } from "next/router";
//3rd
import axios from "axios";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
//Context
import { UserContext } from "../../../src/context/UserContext";
//Component
import { SingleCourseJumbotron } from "../../components/cards/SingleCourseJumbotron";
import { CoursePreviewModal } from "../../components/modals/CoursePreviewModal";
import { SingleCourseLessons } from "../../components/cards/SingleCourseLessons";
//@mui
import Container from "@mui/material/Container";
import Page from "../../components/Page";

export async function getServerSideProps({ query }: any) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`);
  return {
    props: {
      course: data,
    },
  };
}

const SingleCourse = ({ course }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});
  // context
  const {
    state: { user },
  } = useContext(UserContext);

  useEffect(() => {
    if (user && course) checkEnrollment();
  }, [user, course]);

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    console.log("CHECK ENROLLMENT", data);
    setEnrolled(data);
  };

  const router = useRouter();
  const { slug } = router.query;

  const handlePaidEnrollment = async () => {
    // console.log("handle paid enrollment");
    try {
      setLoading(true);
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already enrolled
      //@ts-ignore
      if (enrolled.status)
        //@ts-ignore
        return router.push(`/user/course/${enrolled.course.slug}`);

      router.push("/payment")
      // const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      // //@ts-ignore
      // const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      // //@ts-ignore
      // stripe.redirectToCheckout({ sessionId: data });
    } catch (err) {
      toast("Enrollment failed, try again.");
      console.log(err);
      setLoading(false);
    }
  };

  const handleFreeEnrollment = async (e: any) => {
    // console.log("handle free enrollment");
    e.preventDefault();
    try {
      // check if user is logged in
      if (!user) router.push("/login");
      // check if already enrolled
      //@ts-ignore
      if (enrolled.status)
        //@ts-ignore
        return router.push(`/user/course/${enrolled.course.slug}`);
      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      toast(data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      toast("Enrollment failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <Page title="Kurs İçeriği">
    <Container sx={{ mt: 10 }}>
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
      />
      <CoursePreviewModal
        openCoursePreviewModal={showModal}
        closeCoursePreviewModal={setShowModal}
        preview={preview}
      />
      {course.lessons && (
        <SingleCourseLessons
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </Container>
    </Page>
  );
};

export default SingleCourse;
