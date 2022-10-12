import Link from "next/link";
//Utils
import { currencyFormatter } from "../../utils/helpers";
//UI
import Card from "@mui/material/Card";
import Badge from "@mui/material/Badge";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const cardStyle = {
  card: {
    backgroundColor: "transparent",
    width: 300,
    height: 370,
    margin: 1,
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
    padding: 3,
    // padding: muiBaseTheme.spacing.unit * 3,
  },
  divider: {
    margin: 1,
    // margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
  },
//   font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
//   Bitstream Vera Sans Mono, Courier New, monospace;
  heading: {
    fontFamily: "Bitstream Vera Sans Mono",
    fontWeight: 600,
    fontSize: 15,
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2",
    WebkitBoxOrient: "vertical",
  },

  subheading: {
    lineHeight: 1.8,
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

          <Badge badgeContent={category} sx={{ backgroundColor: "#03a9f4" }} />
          <Typography>
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
