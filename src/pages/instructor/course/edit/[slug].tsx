import { useEffect, useState } from "react";
//next
import { useRouter } from "next/router";
import { ICreateCourseProps, NextPageWithLayout } from "../../../../types";
//3rd
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
//@mui
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
//components
import { CourseCreateForm } from "../../../../components/form/CourseCreateForm";
import InstructorLayout from "../../../../components/layout/InstructorLayout";

const CourseUpdate: NextPageWithLayout = () => {
  const [values, setValues] = useState<ICreateCourseProps>({
    name: "",
    description: "",
    price: 9.99,
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lessons: [],
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState<string>("");
  const [uploadButtonText, setUploadButtonText] =
    useState<string>("Upload Image");

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setValues(data);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const file: File = (target.files as FileList)[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", { image });
      setImage(null);
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image upload failed. Try later.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // console.log(values);
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast("Kurs Güncellendi!");
      router.push(`/instructor/course/view/${slug}`);
    } catch (err: any) {
      toast(err.response.data);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color={"blue"}>
          Mevcut Kursu Güncelle
        </Typography>
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          handleImageRemove={handleImageRemove}
          editPage={true}
        />
      </Box>
    </Container>
  );
};

export default CourseUpdate;

CourseUpdate.getLayout = function getLayout(page: React.ReactElement) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
