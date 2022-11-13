// @mui
import { Typography, TextField, Stack, Button, Grid } from "@mui/material";

export const PaymentForm = () => {
  return (
    <Grid container spacing={2} mt={5}>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Adres Bilgileri</Typography>
      </Grid>
      <Grid item xs={6} md={6} sm={12}>
        <TextField fullWidth label="Ad-Soyad" />
      </Grid>
      <Grid item xs={6} md={6} sm={12}>
        <TextField disabled fullWidth label="Ülke" defaultValue="Türkiye" />
      </Grid>
      <Grid item xs={6} md={6} sm={12}>
        <TextField fullWidth label="Şehir" />
      </Grid>
      <Grid item md={6} xs={6} sm={12}>
        <TextField fullWidth label="Posta Kodu" />
      </Grid>
      <Grid item xs={12}>
        <TextField fullWidth label="Adres" />
      </Grid>
      <Grid item md={6} sm={12}>
      </Grid>
    </Grid>
  );
};
