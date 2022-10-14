import react from "react";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import LoadingButton from "@mui/lab/LoadingButton";

interface ICourseCreateFromProps {
  handleSubmit?: any;
  handleImage?: any;
  handleChange?: any;
  values?: any;
  setValues?: any;
  preview?: any;
  uploadButtonText?: any;
  handleImageRemove?: (f: any) => any;
  editPage?: boolean;
}

export const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButtonText,
  handleImageRemove = (f) => f,
  editPage = false,
}: ICourseCreateFromProps) => {
  const router = useRouter();

  return (
    <Container component="main" maxWidth="lg">
      {values && (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                type="text"
                name="name"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                value={values.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                multiline
                maxRows={4}
                fullWidth
                id="Description"
                label="Description"
                name="description"
                value={values.description}
                className="form-control"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10} sm={10}>
              <TextField
                fullWidth
                disabled={!values.paid}
                type="number"
                name="price"
                id="price"
                label="Fiyat (₺)"
                onChange={(e) => {
                  setValues({ ...values, price: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={2} sm={2}>
              <Grid container justifyContent="center" alignItems="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={values.paid}
                      name="paid"
                      onChange={(e) => {
                        setValues({
                          ...values,
                          paid: e.target.checked,
                          price: 0,
                        });
                        console.log(values.price);
                      }}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="Ücretli"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Kategori"
                name="category"
                value={values.category}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {preview && (
                <Badge
                  badgeContent={"X"}
                  onClick={handleImageRemove}
                  className="pointer"
                >
                  <Avatar sx={{ width: 100, height: 100 }} src={preview} />
                </Badge>
              )}
              {editPage && values.image && (
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={values.image.Location}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box sx={{ marginLeft: 1.35 }}>
                <FormControlLabel
                  control={
                    <TextField
                      type="file"
                      defaultValue={values.image}
                      name="image"
                      onChange={handleImage}
                      hidden
                    />
                  }
                  label={`${uploadButtonText}`}
                />
              </Box>
            </Grid>
            <Grid item xs={8} sm={4}>
              <LoadingButton
                size="large"
                fullWidth
                variant="outlined"
                onClick={handleSubmit}
                loading={values.loading}
                disabled={values.loading || values.uploading}
              >
                {values.loading ? "Kaydediliyor..." : "Kaydet & Devam Et"}
              </LoadingButton>
            </Grid>
            <Grid item xs={8} sm={4}>
              <LoadingButton
                size="large"
                fullWidth
                variant="outlined"
                color="error"
                onClick={() => router.back()}
              >
                {values.loading ? "İptal ediliyor..." : "İptal"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};
