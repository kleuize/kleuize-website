import Typography from "@mui/material/Typography";
import axios from "axios";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { ICreateCourseProps } from "../../../../types";
import { useRouter } from "next/router";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { CourseCreateForm } from "../../../../components/form/CourseCreateForm";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import { LessonAccordion } from "../../../../components/accordion/LessonAccordion";

const CourseUpdate: NextPage = () => {
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
