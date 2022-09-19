import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import type { NextPage } from "next";
import { useState } from "react";
import { ICreateCourseProps } from "../../../types";
import { useRouter } from "next/router";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";

const CreateCourse: NextPage = () => {
  const [values, setValues] = useState<ICreateCourseProps>({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
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

  interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget;
  }

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
    <Box>
      <Typography>Create Course</Typography>
      <Box>
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
      <pre>{JSON.stringify(values, null, 4)}</pre>
      <pre>{JSON.stringify(image, null, 4)}</pre>
    </Box>
  );
};

export default CreateCourse;
