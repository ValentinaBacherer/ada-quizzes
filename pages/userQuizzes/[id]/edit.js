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

import Footer from "../../../components/Footer";
import { DrawerMenu } from "../../../components/Drawer";

const API = "http://localhost:3000/api";

const UserQuiz = ({ quizA }) => {
  const [activeQuiz, setActiveQuiz] = useState(
    quizA[0] ?? {
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
    }
  );
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
      <div className="container">
        <div className="header">
          <DrawerMenu />
          <Heading>Quiz not found</Heading>
          <div />
        </div>
        <main className="main" />
      </div>
    );
  }

  return (
    <div className="container">
      <Head>
        <title>Ada Quizzes</title>
        <link href="/adaicon.ico" rel="icon" />
      </Head>
      <div className="header">
        <DrawerMenu />
        <Heading>{activeQuiz.name}</Heading>
        <div />
      </div>

      <main className="main">
        {!activeQuiz.completed ? (
          <Text>Lee bien cada pregunta y selecciona una respuesta:</Text>
        ) : (
          <Text>Respuestas evaluadas del Ada Quiz {activeQuiz.name}:</Text>
        )}
        <div className="grid">
          <FormControl as="fieldset">
            {activeQuiz.questions.map((question, index) => {
              return (
                <div className="logincard" key={question.id}>
                  <FormLabel as="legend" mb={4}>
                    {index + 1}. {question.title}
                  </FormLabel>
                  <RadioGroup
                    name={question.id}
                    onChange={handleChange(question.id)}
                    type="text"
                    value={selectedValue(question)} // default value?
                  >
                    <Stack direction="column">
                      {question.answers.map((answer) => {
                        let icon = (
                          <img alt="" className="marks" src="/neutral.png" />
                        );

                        if (answer.isSelected && answer.isCorrect) {
                          icon = (
                            <img alt="" className="marks" src="/check.png" />
                          );
                        } else if (answer.isSelected && !answer.isCorrect) {
                          icon = (
                            <img alt="" className="marks" src="/cross.png" />
                          );
                        }

                        return (
                          <div className="flex" key={answer.id}>
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
                  colorScheme="cyan"
                  mt={10}
                  onClick={handleSubmit}
                  type="submit"
                  w="100%"
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

  /*
   * const response = await fetch(`${API}/quiz-questions-api`, {
   *   body: JSON.stringify({
   *     userQuizId: query.id,
   *   }),
   *   headers: {
   *     "Content-Type": "application/json",
   *   },
   *   method: "PUT",
   * });
   * const json = await response.json();
   */

  return {
    props: {
      message: "server side Props",
      quizA: {},
      // quizA: json.quiz,
    },
  };
}
