import {
  Heading,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import Footer from "../components/Footer";
import { DrawerMenu } from "../components/Drawer";

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
  const [quizList, setQuizList] = useState(
    quizzes ?? [
      {
        _id: "602fd2fe7917e0557eca29c2",
        name: "Mongo DB",
        id: "UQ01",
        quizId: "Q01",
        userId: "U01",
        progress: 50,
        completed: false,
        questions: [
          {
            id: "01",
            selected: "",
            completed: false,
            title: "Que es Mongo?",
            answers: [
              {
                id: "01",
                description: "Una base de datos",
                isCorrect: true,
              },
              {
                id: "02",
                description: "Una libreria",
                isCorrect: false,
              },
            ],
          },
          {
            id: "02",
            selected: "",
            completed: false,
            title: "Que es un cluster?",
            answers: [
              {
                id: "01",
                description: "Una planeta nuevo",
                isCorrect: false,
              },
              {
                id: "02",
                description: "Un grupo de servidores",
                isCorrect: false,
              },
            ],
          },
        ],
      },
      {
        _id: "6032969d2fc9a7212e3c2a52",
        name: "Next JS",
        id: "UQ02",
        quizId: "Q02",
        userId: "U01",
        progress: 70,
        completed: false,
        questions: [
          {
            id: "01",
            selected: "",
            title: "Que es Next JS?",
            completed: false,
            answers: [
              {
                id: "01",
                description: "Una base de datos",
                isCorrect: true,
              },
              {
                id: "02",
                description: "Una libreria",
                isCorrect: false,
              },
            ],
          },
          {
            id: "02",
            selected: "",
            title: "Que es un ServerSideProps?",
            completed: false,
            answers: [
              {
                id: "01",
                description: "Una planeta nuevo",
                isCorrect: false,
              },
              {
                id: "02",
                description: "Un grupo de servidores",
                isCorrect: true,
              },
            ],
          },
        ],
      },
    ]
  );
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
    <div className="container">
      <Head>
        <title>Ada Users</title>
        <link href="/adaicon.ico" rel="icon" />
      </Head>
      <div className="header">
        <DrawerMenu />
        <Heading>Lista de Quizzes</Heading>
        <div />
      </div>

      <Text fontSize="xl">
        Explora los quizzes pendientes y completados que tienes en tu registro.
      </Text>
      <main className="main">
        <div className="grid">
          {quizList.map((quiz) => {
            return (
              <div
                className="card"
                key={quiz._id}
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
  // const json = await getUserQuizzes();

  return {
    props: {
      message: "SSProps",
      // quizzes: json.quizzes,
    },
  };
}
