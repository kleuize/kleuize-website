import { useEffect, useState, useContext, Fragment } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Container from "@mui/material/Container";
import { Avatar, Box, Stack } from "@mui/material";
import { UserLayout } from "../../components/layout/UserLayout";
import { PlayCircleOutlined, SyncOutlined } from "@mui/icons-material";
import { useRotateIconStyles } from "../../utils/RotetesIcon";
import { styled } from "@mui/material/styles";
import { Typography, Grid } from "@mui/material";
import Link from "next/link";
import { UserCard } from "../../components/cards/UserCard";
import { NextPageWithLayout } from "../../types";
import UserNav from "../../components/nav/UserNav";
import Page from "../../components/Page";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import Head from "next/head";

const UserIndex: NextPageWithLayout = () => {
  const classes = useRotateIconStyles();
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(UserContext);

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
      console.log(err);
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
        xs={12}
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
