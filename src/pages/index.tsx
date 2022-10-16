import React from "react";
import axios from "axios";
import type { NextPage } from "next";
//UI
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
//Component
import { CourseCards } from "../components/cards/CourseCards";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}

export const Home: NextPage = ({ courses }: any) => {
  return (
    <Container sx={{ mt: 10 }}>
      <Head>
        <title>Kleuize</title>
        <meta name="description" content="Learned English by Kleuize" />
      </Head>
      <Container component="main">
        <h1 className={styles.title}>
          Welcome to{" "}
          <a className={styles.title} href="/">
            Kleuize
          </a>
        </h1>
        <p className={styles.description}>
          Öğrenmeye Başlayın <code className={styles.code}>Tüm Eğitimler</code>
        </p>
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Grid container spacing={3}>
              {courses &&
                courses.map((course: any) => (
                  <div key={course._id} className={styles.grid}>
                    <CourseCards course={course} />
                  </div>
                ))}
            </Grid>
          </Stack>
        </Container>
      </Container>
      <footer></footer>
    </Container>
  );
};

export default Home;
