// @mui
import { Typography, TextField, Stack, Container, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { PaymentCourseCard } from "../../components/cards/PaymentCourseCard";
import Page from "../../components/Page";

// ----------------------------------------------------------------------

const PaymentBillingAddress = () => {
  
  const router = useRouter();

  const course = router.query;

  console.log(course)

  return (
    <Page title="Ödeme Sayfası">
      <Container sx={{ mt: 10 }}>
        <Typography variant="subtitle1">Siparişi Tamamla</Typography>
        <Stack spacing={3} mt={2}>
          <Typography variant="subtitle2">Kurs Bilgileri</Typography>
          <PaymentCourseCard course={course} />
        </Stack>
        <Stack spacing={3} mt={5}>
          <Typography variant="subtitle2">Adres Bilgileri</Typography>
          <TextField label="Person name" />
          <TextField label="Ülke" defaultValue="Türkiye" />
          <TextField label="Şehir" />
          <TextField label="Adres" />
        </Stack>
      </Container>
    </Page>
  );
};

export default PaymentBillingAddress;
