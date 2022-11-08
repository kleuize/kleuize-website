//next
import { useRouter } from "next/router";
import { NextPageWithLayout } from "../../../../types";
//@mui
import Grid from "@mui/material/Grid";
//components
import { StudentLayout } from "../../../../components/layout/StudentLayout";
import Quizzes from "../../../../components/quizzes";
import Page from "../../../../components/Page";

const Quiz: NextPageWithLayout = () => {
  const router = useRouter();
  const { slug, quizId } = router.query;

  return (
    <Page title="Test Çözüm">
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop={10}
        marginLeft={5}
        marginRight={5}
      >
        <Grid item container>
          <Quizzes slug={slug} quizId={quizId} />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Quiz;

Quiz.getLayout = function getLayout(page: React.ReactElement) {
  return <StudentLayout>{page}</StudentLayout>;
};
