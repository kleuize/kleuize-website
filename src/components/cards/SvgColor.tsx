import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";

type SvgColor = {
  src: string;
  sx: {};
  color: string
};

const SvgColor = forwardRef(({ src, sx, color, ...other }: SvgColor, ref: any) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: "inline-block",
      bgcolor: "currentColor",
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

export default SvgColor;
