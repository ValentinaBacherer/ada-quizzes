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

const getUserQuizzes = async () => {
  console.log("-> getUserQuizzes");

  try {
    // TODO pasarle el userID para la busqueda

    // hace FindAll por ahora
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

  const loadUserQuizQuestions = (id) => {
    /*
     * TODO pasarle el quizID + userID a router.push(`/quiz-id/[id]`);
     * o llamar a pagina(componente) con el quizList[x](userquiz)
     */
    console.log("-> loadUserQuizQuestions", id);
    router.push(`/userquiz-id/${id}`);
  };
  // TODO el link o funcion a userquizquestions

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
                onClick={() => loadUserQuizQuestions(quiz.id)}
              >
                <Link href="/">
                  <Heading mb={0} as="h3" size="lg">
                    {quiz.name}
                  </Heading>
                </Link>
                <CircularProgress
                  size="90px"
                  value={quiz.progress}
                  color={quiz.completed ? "green.400" : "cyan.400"}
                >
                  <CircularProgressLabel>
                    {quiz.progress}%
                  </CircularProgressLabel>
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

export async function getServerSideProps({ query }) {
  console.log("-> getSSP quizlist", query);
  // TODO sacar el userID del query y pasarlo a getQuizzes
  const json = await getUserQuizzes();

  return {
    props: {
      message: "SSProps",
      quizzes: json.quizzes,
    },
  };
}
