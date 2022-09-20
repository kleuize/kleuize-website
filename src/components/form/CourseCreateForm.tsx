import MenuItem from "@mui/material/MenuItem";
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
  const children = [];
  for (let i = 9.99; i <= 100.99; i++) {
    children.push(<MenuItem key={i.toFixed(2)}>${i.toFixed(2)}</MenuItem>);
  }
  return (
    <Container component="main" maxWidth="lg">
      {values && (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type="text"
                name="name"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                value={values.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={4}>
              <TextField
                fullWidth
                disabled={values.paid}
                type="number"
                name="price"
                id="price"
                label="Fiyat (₺)"
                onChange={(e) => {
                  setValues({ ...values, price: e.target.value }),
                    console.log(values.price);
                }}
              />
            </Grid>
            <Grid item xs={8}>
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
                  />
                }
                label="Ücretsiz"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                type="text"
                name="category"
                id="category"
                placeholder="Kategori"
                value={values.category}
                onChange={handleChange}
              />
            </Grid>

            <Grid item>
              {preview && (
                <Badge
                  badgeContent={"X"}
                  onClick={handleImageRemove}
                  className="pointer"
                >
                  <Avatar sx={{ width: 200, height: 200 }} src={preview} />
                </Badge>
              )}
              {editPage && values.image && (
                <Avatar
                  sx={{ width: 200, height: 200 }}
                  src={values.image.Location}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControlLabel
                control={
                  <TextField
                    type="file"
                    value={values.image}
                    name="image"
                    onChange={handleImage}
                    hidden
                  />
                }
                label={uploadButtonText}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <LoadingButton
                size="large"
                variant="outlined"
                onClick={handleSubmit}
                loading={values.loading}
                disabled={values.loading || values.uploading}
              >
                {values.loading ? "Saving..." : "Save & Continue"}
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};
