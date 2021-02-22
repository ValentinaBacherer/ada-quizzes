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

import Footer from "../../components/Footer";
import { DrawerMenu } from "../../components/Drawer";
import styles from "../../styles/Home.module.css";

const API = "http://localhost:3000/api";

const Quiz = ({ quiz }) => {
  const [value, setValue] = useState("1");

  console.log("Quiz render", quiz);

  const saveQuizAnswers = () => {
    console.log("En camino");
    // TODO mandar info a servidor para que guarde los datos
  };
  const handleChange = () => {
    console.log("En camino");
    // TODO mandar info a servidor para que guarde los datos
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ada Quizzes</title>
        <link rel="icon" href="/adaicon.ico" />
      </Head>
      <div className={styles.header}>
        <DrawerMenu />
        <Heading>{quiz[0].name}</Heading>
        <div></div>
      </div>

      <main className={styles.main}>
        <Text>Lee bien cada pregunta y selecciona una respuesta:</Text>
        <div className={styles.grid}>
          {quiz[0].questions.map((question, index) => {
            return (
              <div key={index + 1} className={styles.logincard}>
                <Text mb={4}>
                  {index + 1}. {question.title}
                </Text>
                <RadioGroup onChange={setValue} value={value}>
                  <Stack direction="column">
                    {question.answers.map((answer, indexa) => {
                      return (
                        <Radio key={indexa} value={`${indexa + 1}`}>
                          {answer.description}
                        </Radio>
                      );
                    })}
                  </Stack>
                </RadioGroup>
              </div>
            );
          })}
          <Text>Formulario</Text>
          <FormControl as="fieldset">
            {quiz[0].questions.map((question, index) => {
              return (
                <div key={question.id} className={styles.logincard}>
                  <FormLabel as="legend" mb={4}>
                    {index + 1}. {question.title}
                  </FormLabel>
                  <RadioGroup onChange={handleChange} defaultvalue="">
                    <Stack direction="column">
                      {question.answers.map((answer) => {
                        return (
                          <Radio key={answer.id} value={answer.id}>
                            {answer.description}
                          </Radio>
                        );
                      })}
                    </Stack>
                  </RadioGroup>
                </div>
              );
            })}
            <FormHelperText>
              Selecciona la respuesta solo si estas seguro.
            </FormHelperText>
          </FormControl>
          <hr />
          <Button colorScheme="cyan" onClick={saveQuizAnswers}>
            Enviar
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;

export async function getServerSideProps({ query }) {
  console.log("en GSSP", query);

  const response = await fetch(`${API}/quiz-questions-api`, {
    body: JSON.stringify({
      id: query.id,
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
      quiz: json.quiz,
    },
  };
}
