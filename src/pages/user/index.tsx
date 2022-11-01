import { useEffect, useState, Fragment } from "react";
//next
import Head from "next/head";
import { NextPageWithLayout } from "../../types";
//3rd
import axios from "axios";
//layout
import { UserLayout } from "../../components/layout/UserLayout";
//@mui
import { Grid } from "@mui/material";
//component
import { UserCard } from "../../components/cards/UserCard";
import { LoadingSpinner } from "../../components/LoadingSpinner";

const UserIndex: NextPageWithLayout = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user-courses");
      setCourses(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingSpinner />}
      <Head>
        <title>Kullanıcı Sayfası: Kurslarım | Kleuize </title>
        <meta>
          Satın almış olduğunuz bir çok kursa bu alandan ulaşabilirsiniz.
        </meta>
      </Head>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop={10}
        marginLeft={2}
        marginRight={2}
      >
        <Grid item container spacing={3}>
          {courses.map((course) => (
            <Fragment key={course._id}>
              <UserCard course={course} />
            </Fragment>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default UserIndex;

UserIndex.getLayout = function getLayout(page: React.ReactElement) {
  return <UserLayout>{page}</UserLayout>;
};
