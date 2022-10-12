import axios from "axios";
import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
//UI
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Container from "@mui/material/Container";
//Component
import { CourseCards } from "../components/cards/CourseCards";

export const Home: NextPage = () => {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data } = await axios.get("/api/courses");
      setCourses(data);
    };
    fetchCourses();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Head>
        <title>Kleuize</title>
        <meta name="description" content="Learned English by Kleuize" />
      </Head>
      <main>
        <h1 className={styles.title}>
          Welcome to <a href="/">Kleuize</a>
        </h1>
        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>
        <div className={styles.main}>
          <div className={styles.grid}>
            <a href="/login" className={styles.card}>
              <h2>Documentation &rarr;</h2>
              <p>Find in-depth information about Next.js features and API.</p>
            </a>

            <a href="https://nextjs.org/learn" className={styles.card}>
              <h2>Learn &rarr;</h2>
              <p>Learn about Next.js in an interactive course with quizzes!</p>
            </a>
          </div>
        </div>
        <div className={styles.course}>
          {courses.map((course) => (
            <div key={course._id} className={styles.grid}>
              <CourseCards course={course} />
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </Container>
  );
};

export default Home;
