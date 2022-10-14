import React from "react";
//UI
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  justifyContent: "center",
  alignItems: "center",
  p: 4,
};

type CoursePreviewModal = {
  preview: String;
  openCoursePreviewModal: boolean;
  closeCoursePreviewModal: any;
};
export const CoursePreviewModal = ({
  openCoursePreviewModal,
  closeCoursePreviewModal,
  preview,
}: CoursePreviewModal) => {
  return (
    <Modal open={openCoursePreviewModal} onClose={closeCoursePreviewModal}>
      <Box sx={style}>
        <Typography color="primary" variant="h4" component="div" mb={4}>
          Kurs Görüntüsü
        </Typography>
      </Box>
    </Modal>
  );
};
