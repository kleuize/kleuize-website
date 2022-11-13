//next
import { useRouter } from "next/router";
//3rd
import axios from "axios";
// @mui
import { Typography, Stack, Container, Button } from "@mui/material";
//components
import { PaymentCourseCard } from "../../components/cards/PaymentCourseCard";
import { PaymentForm } from "../../components/form/PaymentForm";
import Page from "../../components/Page";

// ----------------------------------------------------------------------

const PaymentBillingAddress = () => {
  const router = useRouter();
  const course = router.query;

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const price = course.coursePrice;
    try {
      // console.log(values);
      const res = await axios.post(`/checkout/initialize/payment`, {
        price,
      });

      const data = res;
      console.log(data);

      router.push(`/payments/compeleted`);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };
  return (
    <Page title="Ödeme Sayfası">
      <Container sx={{ mt: 10 }}>
        <Typography variant="subtitle1">Siparişi Tamamla</Typography>
        <Stack spacing={3} mt={2}>
          <Typography variant="subtitle2">Kurs Bilgileri</Typography>
          <PaymentCourseCard course={course} />
        </Stack>
        <PaymentForm />
        <Button onClick={handleSubmit}>Ödeme Sayfasına Geç</Button>
      </Container>
    </Page>
  );
};

export default PaymentBillingAddress;
