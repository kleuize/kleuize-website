import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { CreateQuizForm } from "../form/CreateQuizForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const QuizChildModal = () => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    title: "",
    description: "",
    questionIndex: 0,
    questions: [
      {
        content: "",
        answers: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      },
    ],
    selectedAnswers: [],
    isLoading: false,
    isValid: false,
    quizID: "",
    errorMessage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)}>Open Child Modal</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <CreateQuizForm values={values} setValues={setValues} />
          <Button onClick={() => setOpen(false)}>Close Child Modal</Button>
        </Box>
      </Modal>
    </Fragment>
  );
};
