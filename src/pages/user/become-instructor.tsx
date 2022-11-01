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
import { Box, Button, Typography } from "@mui/material";
//components
import { LoadingSpinner } from "../../components/LoadingSpinner";
import BeInstructorFaq from "../../components/faqs/BeInstructorFaq";
import Page from "../../components/Page";

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
    <>
      {loading && <LoadingSpinner />}
      <Page title="Kullanıcı: Eğitmen Ol">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            marginTop: 10,
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          <Typography variant="subtitle1" fontSize={28} mb={2}>
            Eğitmen Ol
          </Typography>

          <Typography variant="caption" fontSize={18} mb={2}>
            Kleuize'de kurs yayınlayabilmek için ödeme ayarlarını düzenleyin.
            Ödeme ayarlarını tamamlamak için Stripe hesabımıza
            yönlendirileceksiniz. Ardından eğitimci profilinizi
            oluşturabilirsiniz.
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
      </Page>
    </>
  );
};

export default BecomeInstructor;

BecomeInstructor.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
