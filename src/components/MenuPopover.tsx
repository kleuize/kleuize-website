// @mui
import { styled } from "@mui/material/styles";
import { Popover, PopoverClassKey } from "@mui/material";

// --------------------------Styled--------------------------------------//

const ArrowStyle: any = styled("span")(({ arrow, theme }: any) => {
  const SIZE = 12;

  const POSITION = -(SIZE / 2);

  const borderStyle = `solid 1px ${theme.palette.grey[500]}`;

  const topStyle = {
    borderRadius: "0 0 3px 0",
    top: POSITION,
    borderBottom: borderStyle,
    borderRight: borderStyle,
  };

  return {
    // [theme.breakpoints.up("sm")]: {
    //   zIndex: 1,
    //   width: SIZE,
    //   height: SIZE,
    //   content: "''",
    //   position: "absolute",
    //   transform: "rotate(-135deg)",
    //   background: theme.palette.background.paper,
    // },
    // Top

    ...(arrow === "top-right" && { ...topStyle, right: 20 }),
  };
});

// --------------------------Types--------------------------------------/

export interface IPopoverProps {
  anchorEl?: boolean;
  sx: {};
  children: React.ReactNode;
  disabledArrow: boolean;
  arrow: string;
}

// --------------------------TSX--------------------------------------/

export const MenuPopover = ({
  children,
  arrow = "top-right",
  disabledArrow,
  sx,
  ...other
}: any) => {
  return (
    <Popover
      open={false}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: "inherit",
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
};
