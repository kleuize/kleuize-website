import { useContext, useState } from "react";
//next-type
import { NextPageWithLayout } from "../../types";
//3rd
import axios from "axios";
import { toast } from "react-toastify";
//ctx
import { UserContext } from "../../context/UserContext";
//layout
import { UserLayout } from "../../components/layout/UserLayout";
//@mui
import { Box, Button, Divider, Typography } from "@mui/material";
import BeInstructorFaq from "../../components/faqs/BeInstructorFaq";

const BecomeInstructor: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(UserContext);

  const becomeInstructor = () => {
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        console.log(res);
        window.location.href = res.data;
      })
      .catch((err: any) => {
        console.log(err.response.status);
        toast("Stripe bağlanamadı. Yeniden Deneyin.");
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: 10,
        marginLeft: 2,
        marginRight: 2,
      }}
    >
      <Typography variant="subtitle1" fontSize={32}>
        Eğitmen Ol
      </Typography>
      <br />
      <Typography variant="caption" fontSize={20}>
        Kleuize'de kurs yayınlayabilmek için ödeme ayarlarını düzenleyin. Ödeme
        ayarlarını tamamlamak için Stripe hesabımıza yönlendirileceksiniz.
      </Typography>
      <Button
        onClick={becomeInstructor}
        disabled={
          (user && user.role && user.role.includes("Instructor")) || loading
        }
      >
        {loading ? "Yükleniyor..." : "Ödeme Ayarları"}
      </Button>
      <br />
      <Typography variant="subtitle1">
        Eğitmenlik için sıkça sorulan sorular
      </Typography>
      <br />
      <BeInstructorFaq />
    </Box>
  );
};

export default BecomeInstructor;

BecomeInstructor.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
