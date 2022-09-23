import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
interface IAddLessonFormProps {
  values: any;
  setValues: any;
  handleAddLesson: any;
  uploading: any;
  uploadButtonText: any;
  handleQuiz: any;
  progress: any;
  handleQuizRemove: any;
}

export const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleQuiz,
  progress,
  handleQuizRemove,
}: IAddLessonFormProps) => {
  return (
    <Container>
      <Typography color="primary" variant="h4" component="div" mb={4}>
        Ders Oluştur
      </Typography>
      <Grid container>
        <Grid item xs={12} mb={3}>
          <TextField
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            label="Ders Ana Başlığı"
            variant="outlined"
            size="medium"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <TextField
            value={values.content}
            onChange={(e) => setValues({ ...values, content: e.target.value })}
            rows={4}
            label="Ders Açıklaması"
            placeholder="Dersin genel fikrini ve amacını açıklayın."
            variant="outlined"
            size="medium"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} mb={3}>
          <Divider />
        </Grid>
        <Grid item xs={12} mb={3}>
          {progress > 0 && (
            <LinearProgress variant="determinate" value={progress} />
          )}
        </Grid>
        <Grid item xs={12} mb={3}>
          <LoadingButton onClick={handleAddLesson} loading={uploading}>
            Kaydet
          </LoadingButton>
        </Grid>
        <Grid>
            <Button>Cancel</Button>
        </Grid>
      </Grid>
    </Container>
  );
};
