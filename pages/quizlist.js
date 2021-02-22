import {
  Heading,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Footer from "../components/Footer";
import { DrawerMenu } from "../components/Drawer";
import styles from "../styles/Home.module.css";

const API = "http://localhost:3000/api";

const getQuizzes = async () => {
  console.log("En getQuizzes");

  try {
    const response = await fetch(`${API}/quiz-list-api`);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
};

const QuizList = ({ quizzes }) => {
  const [quizList, setQuizList] = useState(quizzes ?? []);
  const router = useRouter();

  const loadQuiz = (id) => {
    // router.push(`/quiz-id/[id]`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ada Quizzes</title>
        <link rel="icon" href="/adaicon.ico" />
      </Head>
      <div className={styles.header}>
        <DrawerMenu />
        <Heading>Lista de Quizzes</Heading>
        <div></div>
      </div>

      <main className={styles.main}>
        <div className={styles.grid}>
          {quizList.map((quiz) => {
            return (
              <div
                key={quiz._id}
                className={styles.card}
                onClick={() => loadQuiz(quiz._id)}
              >
                <Link href="/">
                  <Heading mb={0} as="h3" size="lg">
                    {quiz.name}
                  </Heading>
                </Link>
                <CircularProgress size="90px" value={70} color="cyan.400">
                  <CircularProgressLabel>70%</CircularProgressLabel>
                </CircularProgress>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizList;

export async function getServerSideProps() {
  console.log("getServerSP quizlist");
  const json = await getQuizzes();

  return {
    props: {
      message: "otro prop",
      quizzes: json.quizzes,
    },
  };
}
