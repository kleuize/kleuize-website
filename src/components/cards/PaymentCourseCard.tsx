import React from "react";
//next
import Image from "next/image";
// @mui
import { Box, Divider, Typography } from "@mui/material";
// utils
import { Capitalize } from "../../utils/Capitalize";

// -----------------------------CourseCard------------------------------------ //

export const PaymentCourseCard = ({ course }: any) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Image
        alt="kurs resmi"
        src={course.courseImage ? course.courseImage : "/course.jpg"}
        width={64}
        height={64}
        style={{ borderRadius: 1.5, marginRight: 2 }}
      />
      <Box sx={{ ml: 3 }}>
        <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
          {Capitalize(course.courseName)}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="body2">
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              Kategori:&nbsp;
            </Typography>
            {course.courseCategory}
          </Typography>
          <Divider orientation="vertical" sx={{ mx: 1, height: 16 }} />
          <Typography variant="body2">
            <Typography
              component="span"
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              Fiyat:&nbsp;
            </Typography>
            {`₺${course.coursePrice}`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
