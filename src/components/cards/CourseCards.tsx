import Link from "next/link";
//Utils
import { currencyFormatter } from "../../utils/helpers";
//MUI
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
//JoyUI
import Chip from "@mui/joy/Chip";

const cardStyle = {
  card: {
    backgroundColor: "transparent",
    width: 300,
    height: 370,
    margin: 1,
    borderRadius: 2,
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.4)",
    },
  },
  media: {
    width: 300,
    height: 175,
  },
  content: {
    textAlign: "left",

    // padding: muiBaseTheme.spacing.unit * 3,
  },
  divider: {
    margin: 1,
    // margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
  },
  //   font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
  //   Bitstream Vera Sans Mono, Courier New, monospace;
  heading: {
    fontFamily: "Helvetica Neue",
    fontWeight: 600,
    fontSize: 18,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },

  subheading: {
    fontFamily: "Helvetica Neue",
    fontWeight: 600,
  },
};

export const CourseCards = ({ course }: any) => {
  const { name, instructor, price, image, slug, paid, category } = course;

  console.log(instructor);
  return (
    <Link href={`/course/${slug}`}>
      <Card sx={cardStyle.card}>
        <CardMedia
          component="img"
          image={image.Location}
          alt={name}
          sx={cardStyle.media}
        />
        <CardContent sx={cardStyle.content}>
          <Typography sx={cardStyle.heading}>{name}</Typography>
          <Typography variant={"caption"}>{instructor.name}</Typography>
          <Divider sx={cardStyle.divider} light />
          <Chip
            variant="outlined"
            color="primary"
            size="sm"
            sx={{ pointerEvents: "none" }}
          >
            {category}
          </Chip>
          <Typography sx={cardStyle.subheading}>
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};
