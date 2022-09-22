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
    <div>
      <div>Add Lesson Form</div>
    </div>
  );
};
