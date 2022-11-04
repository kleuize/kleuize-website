
import { forwardRef } from "react";
//@mui
import { useTheme } from "@mui/material/styles";
import Avatar from '@mui/material/Avatar';

// ---------------------------Types-------------------------------------//

type AvatarType = {
  children: React.ReactNode;
  sx: {};
  color:
    | "default"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | "error" 
};

// eslint-disable-next-line react/display-name
export const MuiAvatar = forwardRef(
  ({ color = "default", children, sx, ...other }: AvatarType, ref) => {
    const theme = useTheme();

    if (color === "default") {
      return (
        <Avatar sx={sx} {...other}>
          {children}
        </Avatar>
      );
    }

    return (
      <Avatar
        sx={{
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
          ...sx,
        }}
        {...other}
      >
        {children}
      </Avatar>
    );
  }
);
