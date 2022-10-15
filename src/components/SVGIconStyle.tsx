import { Box } from "@mui/material";

interface ISVGIconStyle {
  src: string;
  sx: {};
}

export const SvgIconStyle = ({ src, sx }: ISVGIconStyle) => {
  return (
    <Box
      component="span"
      sx={{
        width: 24,
        height: 24,
        display: "inline-block",
        bgcolor: "currentColor",
        mask: `url(${src}) no-repeat center / contain`,
        WebkitMask: `url(${src}) no-repeat center / contain`,
        ...sx,
      }}
    />
  );
};
