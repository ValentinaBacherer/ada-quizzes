import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import {
  Button,
  Flex,
  Spacer,
  Input,
  VStack,
  Text,
  Heading,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

import dbConnect from "../../../utils/dbConnect";
import Quiz from "../../../models/Quiz";
import Footer from "../../../components/Footer";
import SelectQuestion from "../../../components/SelectQuestion";
import { DrawerMenu } from "../../../components/Drawer";

/* Allows you to view user card info and delete pet card*/
const QuizPage = ({ quiz }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    const quizID = router.query.id;

    try {
      await fetch(`/api/quizzes/${quizID}`, {
        method: "Delete",
      });
      router.push("/quizzes");
    } catch (error) {
      setMessage("Failed to delete the quiz.");
    }
  };

  return (
    <div className="container" key={quiz._id}>
      <Head>
        <title>Ada Quizzes</title>
        <link href="/adaicon.ico" rel="icon" />
      </Head>
      <div className="header">
        <DrawerMenu />
        <Heading>Datos de Quizz</Heading>
        <div />
      </div>
      <div className="main">
        <div className="grid">
          <div className="logincard">
            <VStack>
              <Heading as="h2" size="lg">
                {quiz.title}
              </Heading>
              <Text fontSize="lg">Difficulty: {quiz.difficulty}</Text>
            </VStack>
            <VStack align="left">
              <Heading as="h2" mt="30" size="md">
                Answer the following questions:
              </Heading>
              {quiz.questions?.map((question) => {
                console.log("question", question);
                const answersArray = question.answers.map(
                  (answer) => answer.title
                );

                console.log("->answer Array", answersArray);

                return (
                  <SelectQuestion
                    key={question._id}
                    options={answersArray}
                    question={question.title}
                  />
                );
              })}
              {!quiz.questions?.length && (
                <SelectQuestion
                  options={[
                    "Una nueva moda",
                    "Una libreria para nodejs",
                    "Un framework de trabajo",
                  ]}
                  question="¿Que es React?"
                />
              )}
              <Flex>
                <Link
                  as={`/quizzes/${quiz._id}/edit`}
                  href="/quizzes/[id]/edit"
                >
                  <Button colorScheme="cyan" width="65%">
                    Editar
                  </Button>
                </Link>
                <Spacer />

                {/* revisar */}
                <Button colorScheme="yellow" onClick={handleDelete} width="30%">
                  Borrar
                </Button>
              </Flex>
            </VStack>
          </div>
        </div>
        {message && <p>{message}</p>}
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const quiz = await Quiz.findById(params.id).lean();

  quiz._id = quiz._id.toString();
  quiz.createdAt = quiz.createdAt
    ? quiz.createdAt.toISOString().split("T")[0]
    : "";
  quiz.updatedAt = quiz.updatedtedAt
    ? quiz.updatedtedAt.toISOString()
    : "".split("T")[0];
  quiz.questions?.map((question) => {
    question._id = question._id.toString();
    question?.answers?.map((answer) => {
      answer._id = answer._id.toString();
    });
  });

  return { props: { quiz } };
}

export default QuizPage;
