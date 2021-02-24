import {
  RadioGroup,
  Radio,
  Stack,
  Text,
  Heading,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

import Footer from "../../components/Footer";
import { DrawerMenu } from "../../components/Drawer";
import styles from "../../styles/Home.module.css";

const API = "http://localhost:3000/api";

const UserQuiz = ({ quizA }) => {
  const [activeQuiz, setActiveQuiz] = useState(quizA[0] ?? {});
  const [answersObject, setAnswersObject] = useState({});
  const router = useRouter();

  console.log(
    "Quiz Render activeQuiz,answersObject state :",
    activeQuiz,
    answersObject
  );

  const updateActiveQuiz = async () => {
    console.log("-> updateActiveQuiz");

    const response = await fetch(`${API}/quiz-update-api`, {
      body: JSON.stringify({
        activeQuiz,
        answersObject,
        userquizId: activeQuiz.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    const json = await response.json();

    console.log("resultado updateActiveQuiz", json);
  };

  const selectedValue = (question) => {
    console.log(
      "-> selectedValue",
      question.answers.find((item) => item.isSelected === true)?.id
    );

    return question.answers.find((item) => item.isSelected === true)?.id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("-> handleSubmit");

    updateActiveQuiz();

    // TODO que vuelva a la vista de (userID) quizlist
    router.push("/userquizlist"); // <Link as='/quizlist/U01' href='/quizlist/[]'>
  };
  // una funcion que devuelve una funcion
  const handleChange = (questionId) => (answerId) => {
    console.log("-> handleChange", answerId, questionId);

    setAnswersObject((oldAnswersObject) => {
      return {
        ...oldAnswersObject,
        [questionId]: answerId, // dinamic object property
      };
    });
  };

  if (!activeQuiz) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <DrawerMenu />
          <Heading>Quiz not found</Heading>
          <div></div>
        </div>
        <main className={styles.main}></main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Ada Quizzes</title>
        <link rel="icon" href="/adaicon.ico" />
      </Head>
      <div className={styles.header}>
        <DrawerMenu />
        <Heading>{activeQuiz.name}</Heading>
        <div></div>
      </div>

      <main className={styles.main}>
        {!activeQuiz.completed ? (
          <Text>Lee bien cada pregunta y selecciona una respuesta:</Text>
        ) : (
          <Text>Respuestas evaluadas del Ada Quiz {activeQuiz.name}:</Text>
        )}
        <div className={styles.grid}>
          <FormControl as="fieldset">
            {activeQuiz.questions.map((question, index) => {
              return (
                <div key={question.id} className={styles.logincard}>
                  <FormLabel as="legend" mb={4}>
                    {index + 1}. {question.title}
                  </FormLabel>
                  <RadioGroup
                    type="text"
                    name={question.id}
                    onChange={handleChange(question.id)}
                    value={selectedValue(question)} // default value?
                  >
                    <Stack direction="column">
                      {question.answers.map((answer) => {
                        let icon = (
                          <img
                            src="/neutral.png"
                            className={styles.marks}
                            alt=""
                          />
                        );

                        if (answer.isSelected && answer.isCorrect) {
                          icon = (
                            <img
                              className={styles.marks}
                              src="/check.png"
                              alt=""
                            />
                          );
                        } else if (answer.isSelected && !answer.isCorrect) {
                          icon = (
                            <img
                              className={styles.marks}
                              src="/cross.png"
                              alt=""
                            />
                          );
                        }

                        return (
                          <div key={answer.id} className={styles.flex}>
                            {activeQuiz.completed && question.completed && icon}

                            <Radio key={answer.id} value={answer.id}>
                              {answer.description}
                            </Radio>
                          </div>
                        );
                      })}
                    </Stack>
                  </RadioGroup>
                </div>
              );
            })}
            {!activeQuiz.completed ? (
              <>
                <FormHelperText>
                  Envia las respuesta solo si estas seguro.
                </FormHelperText>
                <Button
                  mt={10}
                  w="100%"
                  type="submit"
                  colorScheme="cyan"
                  onClick={handleSubmit}
                >
                  Enviar
                </Button>{" "}
              </>
            ) : (
              ""
            )}
          </FormControl>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserQuiz;

export async function getServerSideProps({ query }) {
  console.log("-> UserQuiz GSSP", query);

  const response = await fetch(`${API}/quiz-questions-api`, {
    body: JSON.stringify({
      userQuizId: query.id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
  });
  const json = await response.json();

  return {
    props: {
      message: "server side Props",
      quizA: json.quiz,
    },
  };
}
