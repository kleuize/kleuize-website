import { useState } from "react";
//@types-next
import { useRouter } from "next/router";
import { ICreateCourseProps, NextPageWithLayout } from "../../../types";
//3rd
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
//@mui
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//form
import { CourseCreateForm } from "../../../components/form/CourseCreateForm";
//components
import Page from "../../../components/Page";
import InstructorLayout from "../../../components/layout/InstructorLayout";

const CreateCourse: NextPageWithLayout = () => {
  const [values, setValues] = useState<ICreateCourseProps>({
    name: "",
    description: "",
    price: 9.99,
    uploading: false,
    paid: false,
    category: "",
    loading: false,
  });

  const [image, setImage] = useState({});
  const [preview, setPreview] = useState<string>("");
  const [uploadButtonText, setUploadButtonText] =
    useState<string>("Upload Image");

  const router = useRouter();

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
      setImage({});
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
      const { data } = await axios.post("/api/course", {
        ...values,
        image,
      });
      toast("Great! Now you can start adding lessons");
      router.push("/instructor");
    } catch (err: any) {
      toast(err.response.data);
    }
  };

  return (
    <Page title="Eğitimci: Kurs Oluştur">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" color={"blue"}>
          Yeni Kurs Oluştur
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
        />
      </Box>
    </Page>
  );
};

export default CreateCourse;

CreateCourse.getLayout = function getLayout(page: React.ReactElement) {
  return <InstructorLayout>{page}</InstructorLayout>;
};
