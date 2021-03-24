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
import SelectAnswer from "../../../components/SelectAnswer";
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
            </VStack>
            <VStack align="left">
              <Text fontSize="lg">Difficulty: {quiz.difficulty}</Text>
              <Heading as="h2" size="md">
                Likes
              </Heading>
              <SelectAnswer
                groupName="¿Que es React?"
                options={[
                  "Una nueva moda",
                  "Una libreria para nodejs",
                  "Un framework de trabajo",
                ]}
              />
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

  return { props: { quiz } };
}

export default QuizPage;
