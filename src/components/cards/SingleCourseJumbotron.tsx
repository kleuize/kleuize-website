import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { currencyFormatter } from "../../utils/helpers";
import { useRotateIconStyles } from "../../utils/RotetesIcon";
import { SyncOutlined } from "@mui/icons-material";

export const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  loading,
  user,
  handlePaidEnrollment,
  handleFreeEnrollment,
  enrolled,
  setEnrolled,
}: any) => {
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;

  const classes = useRotateIconStyles();

  return (
    <Container
      sx={{
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
        "&:hover": {
          boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.4)",
        },
        padding: 3,
        border: 0.3,
        borderRadius: 3,
      }}
    >
      <div style={{ display: "flex", flex: 1, flexDirection: "row" }}>
        <div>
          {/* title */}
          <h1 className="text-light font-weight-bold">{name}</h1>
          {/* description */}
          <p className="lead">
            {description && description.substring(0, 160)}...
          </p>
          {/* category */}
          <p>Kategori {category}</p>
          {/* <Badge
          count={category}
          style={{ backgroundColor: "#03a9f4" }}
          className="pb-4 mr-2"
        /> */}
          {/* author */}
          <p>Created by {instructor.name}</p>
          {/* updated at */}
          <p>Last udpated {new Date(updatedAt).toLocaleDateString()}</p>
          {/* price */}
          <h4 className="text-light">
            {paid
              ? currencyFormatter({
                  amount: price,
                  currency: "usd",
                })
              : "Free"}
          </h4>
        </div>
        <Box>
          <img
            width="500"
            height="300"
            src={image.Location}
            alt={name}
            style={{
              border: 1,
              borderColor: "black",
              borderRadius: 10,
              marginLeft: 2,
            }}
          />
          <div>
            {loading ? (
              <div>
                <SyncOutlined className={classes.rotateIcon} />
              </div>
            ) : (
              <div>
                <Button
                  variant="contained"
                  onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                >
                  {user ? "Kayıtlı" : "Kayıt Ol"}
                </Button>
              </div>
            )}
          </div>
        </Box>
      </div>
    </Container>
  );
};
