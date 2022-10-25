import Link from "next/link";
//Utils
import { currencyFormatter } from "../../utils/helpers";
//MUI
import Image from "next/image";
import { Grid } from "@mui/material";
import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
//JoyUI
import Chip from "@mui/joy/Chip";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";
import AspectRatio from "@mui/joy/AspectRatio";

const CustomCard = styled("div")(({ theme }) => ({
  backgroundColor: "whiteSmoke",
  width: "32rem",
  height: "20.5rem",
  margin: 3,
  padding: 20,
  borderRadius: 2,
  transition: "0.3s",
  [theme.breakpoints.down("md")]: {
    width: "27.5rem",
    height: "40rem",
  },
}));

const ImageContainer = styled("div")(({ theme }) => ({
  backgroundColor: "red",
  width: "12rem",
  height: "16.5rem",
  borderRadius: 2,
}));

const Capitalize = (text: string) => {
  return (
    // str.charAt(0).toUpperCase() + str.slice(1, str.length)
    text.replace(
      /(^\w|\s\w)(\S*)/g,
      (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
    )
  );
};

export const CourseCards = ({ course }: any) => {
  const { name, instructor, price, image, slug, paid, category } = course;

  return (
    <Link href={`/course/${slug}`}>
      <CustomCard>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {Capitalize(name)}
        </Typography>
        <Typography level="body2">{Capitalize(instructor.name)}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
        >
          <BookmarkAdd />
        </IconButton>
        <ImageContainer>
          {/* <img
            src={image.Location}
            // srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          /> */}
        </ImageContainer>
        <Box sx={{ display: "flex" }}>
          <div>
            <Typography level="body3">Total price:</Typography>
            <Typography fontSize="lg" fontWeight="lg">
              {paid
                ? currencyFormatter({
                    amount: price,
                    currency: "usd",
                  })
                : "Free"}
            </Typography>
          </div>
          <Button
            variant="solid"
            size="sm"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", fontWeight: 600 }}
          >
            Explore
          </Button>
        </Box>
        {/* <Card sx={cardStyle.card}> */}

        {/* <CardMedia
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
        </CardContent> */}
      </CustomCard>
    </Link>
  );
};
