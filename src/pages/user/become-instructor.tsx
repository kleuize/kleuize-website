import { Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { UserLayout } from "../../components/layout/UserLayout";
import { NextPageWithLayout } from "../../types";

const BecomeInstructor: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(UserContext);

  const becomeInstructor = () => {
    // console.log("become instructor");
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err: any) => {
        console.log(err.response.status);
        toast("Stripe onboarding failed. Try again.");
        setLoading(false);
      });
  };

  return (

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography>Become Instructor</Typography>
        </Box>
        <Box
          sx={{
            display: "felx",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography>Setup payout to publish courses on Kleuize.</Typography>
          </Box>
          <Button
            onClick={becomeInstructor}
            disabled={
              (user && user.role && user.role.includes("Instructor")) || loading
            }
          >
            {loading ? "Processing..." : "Payout Setup"}
          </Button>
        </Box>
        <Box>
          <Typography>
            You will be redirected to stripe to complete onboarding process.
          </Typography>
        </Box>
      </Box>
  );
};

export default BecomeInstructor;

BecomeInstructor.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <UserLayout>
      {page}
    </UserLayout>
  )
}
