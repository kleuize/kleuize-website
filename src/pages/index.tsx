import React from "react";
import type { NextPage } from "next";
//3rd party
import axios from "axios";
//UI
import Head from "next/head";
import Image from "next/image";
import {
  Grid,
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import { styled } from "@mui/material/styles";
//Component
import { CourseCard } from "../components/cards/CourseCard";

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
    <Container sx={{ mt: 15 }}>
      <Head>
        <title>Kleuize</title>
        <meta name="description" content="Learned English by Kleuize" />
      </Head>
      <Grid container xs={12} spacing={1} mb={10}>
        <Grid
          container
          xs={12}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Stack justifyContent="center" alignItems="center" ml={3}>
              <Typography
                variant="h2"
                fontSize={32}
                fontWeight="bold"
                color="#08104D"
              >
                {/* <a href="/">Kleuize</a>  */}
                Öğrenmenin daha fazlasına göz atın.
              </Typography>
              <Stack sx={{ mb: 1 }}></Stack>
              <Typography
                variant="h6"
                color="#6C708E"
                fontWeight="bold"
                component="p"
              >
                {
                  " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard."
                }
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack justifyContent="center" alignItems="center">
              <Image
                alt="header-image"
                src="/slider.svg"
                width={600}
                height={400}
              />
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid item xs={12}>
        <Typography
          variant="h3"
          fontSize={20}
          fontWeight="600"
          marginY={5}
          color="#6C708E"
        >
          Haftanın öne çıkanları
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        {courses &&
          courses.map((course: any, index: number) => (
            <CourseCard key={course._id} course={course} index={index} />
          ))}
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="h3"
          fontSize={20}
          fontWeight="600"
          marginY={5}
          color="#6C708E"
        >
          Tüm Kurslar
        </Typography>
      </Grid>
      <Grid container spacing={3}>
        {courses &&
          courses.map((course: any, index: number) => (
            <CourseCard key={course._id} course={course} index={index} />
          ))}
      </Grid>
    </Container>
  );
};

export default Home;
