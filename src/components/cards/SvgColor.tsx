import { forwardRef } from "react";
// @mui
import { Box } from "@mui/material";

type SvgColor = {
  src: string;
  sx: {};
};

// eslint-disable-next-line react/display-name
const SvgColor = forwardRef(({ src, sx, ...other }: any, ref: any) => (
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
