import Link from "next/link";
//Utils
import { currencyFormatter } from "../../utils/helpers";
//UI
import Card from "@mui/material/Card";
import Badge from "@mui/material/Badge";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";

export const CourseCards = ({ course }: any) => {
  const { name, instructor, price, image, slug, paid, category } = course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card>
          <CardMedia
            component="img"
            image={image.Location}
            alt={name}
            sx={{ height: "200px", objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              {name}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {instructor}
            </Typography>
            <CardActions>
              <Badge
                badgeContent={category}
                sx={{ backgroundColor: "#03a9f4" }}
              />
              <Typography>
                {paid
                  ? currencyFormatter({
                      amount: price,
                      currency: "usd",
                    })
                  : "Free"}
              </Typography>
            </CardActions>
          </CardContent>
        </Card>
      </a>
    </Link>
  );
};
