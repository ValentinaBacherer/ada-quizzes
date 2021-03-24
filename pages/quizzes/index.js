import Link from "next/link";
import {
  Button,
  Flex,
  Spacer,
  Input,
  VStack,
  Text,
  Heading,
} from "@chakra-ui/react";
import Head from "next/head";

import dbConnect from "../../utils/dbConnect";
import Quiz from "../../models/Quiz";
import Footer from "../../components/Footer";
import { DrawerMenu } from "../../components/Drawer";

const QuizzesList = ({ quizzes }) => (
  <div className="container">
    <Head>
      <title>Ada Quizzes</title>
      <link href="/adaicon.ico" rel="icon" />
    </Head>
    <div className="header">
      <DrawerMenu />
      <Heading>Lista de Quizzes</Heading>
      <div />
    </div>
    <Text fontSize="xl">
      Estos son los quizzes disponibles, busca el que te parezca mas apropiado y
      suerte!
    </Text>
    <div className="main">
      <Flex marginTop="1rem" width="100%">
        <Spacer />
        {/* <Link href='/new'>
          <Heading as='h3' size='sm'>
            <a className='cursor'> Nuevo Usuario --&gt;&gt; </a>
          </Heading>
        </Link> */}
      </Flex>
      <div className="users-grid">
        {/* Create a card for each user */}
        {quizzes?.map((quiz) => (
          <div className="users-card" key={quiz._id}>
            <VStack>
              <Link as={`/quizzes/${quiz._id}`} href="/quizzes/[id]">
                <div className="link">
                  <Heading as="h3" size="md">
                    &lt; {quiz.title} &#47;&gt;
                  </Heading>
                  <Text>{quiz.difficulty}</Text>
                </div>
              </Link>

              {/* Extra User Info: Likes and Dislikes
              <div className='likes info'>
                <p className='label'>Likes</p>
                <ul>
                  {user.likes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div>
              <div className='dislikes info'>
                <p className='label'>Dislikes</p>
                <ul>
                  {user.dislikes.map((data, index) => (
                    <li key={index}>{data} </li>
                  ))}
                </ul>
              </div> */}

              {/* <div className='users-list-btn'>
                <Link as={`/${user._id}/edit`} href='/[id]/edit'>
                  <Button colorScheme='cyan' width='47%'>
                    Edit
                  </Button>
                </Link>
              </div> */}
            </VStack>
          </div>
        ))}
      </div>
      <Link href="/quizzes/new">
        <Button colorScheme="cyan" width="47%">
          Nuevo Quiz
        </Button>
      </Link>
    </div>
    <Footer />
  </div>
);

/* Retrieves user(s) data from mongodb database */
export async function getServerSideProps() {
  console.log("Quizzes List gSSP");
  await dbConnect();

  const result = await Quiz.find({});

  /* returns an array with many docs(pets(objects))*/
  console.log("gSSP", result);

  /* create an array with all the docs (typeof doc = object)of the collection converted to objects */
  const quizzes = result?.map((doc) => {
    console.log("Type of doc", typeof doc);

    /*
     * toObject() Returns an object with each property name
     * and value corresponding to the entries in this collection.
     * Returns a cloned, vanilla object.
     */
    const quiz = doc.toObject();

    console.log("type of quiz", typeof quiz, quiz);
    quiz._id = quiz._id.toString();

    quiz.createdAt = quiz.createdAt
      ? quiz.createdAt.toISOString().split("T")[0]
      : "";
    quiz.updatedAt = quiz.updatedtedAt
      ? quiz.updatedtedAt.toISOString()
      : "".split("T")[0];

    return quiz;
  });

  return { props: { quizzes } };
}

export default QuizzesList;
