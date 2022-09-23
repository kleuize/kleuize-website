import React from "react";
import { useRouter } from "next/router";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Container from "@mui/material/Container";

interface ICreateQuizForm {
  handleSelectAnswer?: any;
  handleChangePage?: any;
  handleChangeAnswer?: any;
  handleChangeTitle?: any;
  handleChangeDescription?: any;
  handleChangeQuestion?: any;
  values?: any;
  setValues?: any;
  preview?: any;
  uploadButtonText?: any;
  editPage?: boolean;
}

export const CreateQuizForm = ({
  handleSelectAnswer,
  handleChangePage,
  handleChangeTitle,
  handleChangeAnswer,
  handleChangeDescription,
  handleChangeQuestion,
  values,
  setValues,
  preview,
  uploadButtonText,
  editPage,
}: ICreateQuizForm) => {
  //   const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <Container>
      <Typography color="secondary" variant="h4" component="div" mb={4}>
        Quiz Oluştur
      </Typography>
      {values && (
        <Grid container>
          <Grid item xs={12} mb={3}>
            <TextField
              value={values.title}
              onChange={handleChangeTitle}
              label="Test Başlığı"
              variant="outlined"
              size="medium"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <TextField
              value={values.description}
              onChange={handleChangeDescription}
              label="Test Açıklaması"
              placeholder="Testin genel fikrini ve amacını açıklayın."
              variant="outlined"
              size="medium"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} mb={3}>
            <Divider />
          </Grid>
          <Grid item xs={12} mb={3}>
            <TextField
              value={values.currentQuestion}
              onChange={handleChangeQuestion}
              label={`Test ${values.questionIndex + 1}`}
              variant="outlined"
              size="medium"
              fullWidth
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

//  {/* <Grid container>
//

//         {/* Quiz Title */}
//         <Grid item xs={12} mb={3}>
//           <Divider />
//         </Grid>

//         {/* Question */}
//         <Grid item xs={12} mb={3}>
//           <TextField
//             // value={currentQuestion.content}
//             onChange={handleChangeQuestion}
//             label={`Test ${values.questionIndex + 1}`}
//             variant="outlined"
//             size="medium"
//             fullWidth
//             inputProps={{ "data-testid": "question-content" }}
//           />
//         </Grid>

//         {/* Answers */}
//         <Grid item xs={12} mb={2}>
//           <FormControl component="fieldset">
//             <FormLabel>
//               Cevap
//               <Typography>Doğru Cevabı İşaretleyin</Typography>
//             </FormLabel>
//             <RadioGroup
//               aria-label="gender"
//               name="controlled-radio-buttons-group"
//               value={values.selectedAnswer}
//               onChange={handleSelectAnswer}
//             >
//               <FormControlLabel
//                 value={values.answer.id}
//                 control={
//                   <Radio
//                     inputProps={{
//                       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                       // @ts-ignore
//                       "data-testid": `answer-radio-${values.index + 1}`,
//                     }}
//                   />
//                 }
//                 label={
//                   <TextField
//                     label={`Answer ${values.index + 1}...`}
//                     name={values.answer.id}
//                     value={values.answer.text}
//                     onChange={handleChangeAnswer}
//                     inputProps={{
//                       "data-testid": `answer-text-${values.index + 1}`,
//                     }}
//                   />
//                 }
//               />
//             </RadioGroup>
//           </FormControl>
//         </Grid>

//         {/* Pagination */}
//         <Grid item xs={12} mb={4}>
//           <Pagination
//             count={values.questions.length}
//             page={values.questionIndex + 1}
//             color="primary"
//             onChange={handleChangePage}
//             renderItem={(item) => {
//               if (item.type === "page") {
//                 return (
//                   <PaginationItem {...item} data-testid={`page-${item.page}`} />
//                 );
//               } else return <PaginationItem {...item} />;
//             }}
//           />
//         </Grid>

//         {/* Buttons */}
//         <Grid
//           container
//           item
//           direction="row"
//           xs={12}
//           maxWidth={700}
//           mx="auto"
//           spacing={3}
//         >
//           <Grid item xs={12} md={4}>
//             <Button
//               variant="contained"
//               color="primary"
//               //   onClick={() => dispatch(removeQuestion())}
//               onClick={() => console.log("removeQuestion")}
//               disabled={values.questions.length < 2}
//             >
//               Remove Question
//             </Button>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Tooltip title="You can only have 10 questions max per quiz">
//               <div>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   //   onClick={() => dispatch(addQuestion())}
//                   onClick={() => console.log("add question")}
//                   disabled={values.questions.length >= 10}
//                 >
//                   Add a question
//                 </Button>
//               </div>
//             </Tooltip>
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <Button
//               variant="contained"
//               color="secondary"
//               //   onClick={() => dispatch(createQuiz())}
//               onClick={() => console.log("create quiz")}
//             >
//               Test Oluştur
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid> */}
