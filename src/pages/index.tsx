import React from "react";
import type { NextPage } from "next";
//3rd party
import axios from "axios";
//CSS
import "../styles/Home.module.css";
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
            <Stack justifyContent="center" alignItems="center" ml={4}>
              <Typography
                variant="h1"
                fontSize={38}
                fontWeight="bold"
                color="#08104D"
              >
                {/* <a href="/">Kleuize</a>  */}
                Öğrenmenin daha fazlasına göz atın.
              </Typography>
              <br />
              <Typography
                variant="h5"
                color="#6C708E"
                fontWeight="bold"
                component="p"
              >
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard.
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
      <Grid container flexDirection="row">
        <Grid item xs={12}>
          <Typography
            variant="h2"
            fontSize={20}
            fontWeight="600"
            marginY={5}
            color="#6C708E"
          >
            Haftanın öne çıkanları
          </Typography>
        </Grid>
        <Grid item xs={6} md={6} lg={4}>
          {courses &&
            courses.map((course: any, index: number) => (
              <div key={course._id}>
                <CourseCard course={course} index={index} />
                <CourseCard course={course} index={index + 3} />
                <CourseCard course={course} index={index + 6} />
              </div>
            ))}
            
        </Grid>
        <Grid item xs={12}>
          {/* <Typography
            variant="h2"
            fontSize={20}
            fontWeight="600"
            marginY={5}
            color="#6C708E"
          >
            Tüm kurslar
          </Typography>
          <Grid
            item
         
          >
            {courses &&
              courses.map((course: any) => (
                <div key={course._id}>
                  <CourseCards course={course} />
                </div>
              ))}
          </Grid> */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
