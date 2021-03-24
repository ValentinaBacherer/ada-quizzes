import { Heading } from "@chakra-ui/react";
import Head from "next/head";

import QuizForm from "../../components/QuizForm";
import { DrawerMenu } from "../../components/Drawer";
import Quiz from "../../models/Quiz";
import dbConnect from "../../utils/dbConnect";
import Footer from "../../components/Footer";

const NewQuiz = ({ quizForm }) => {
  console.log(("New Quiz received", quizForm));

  return (
    <div className="container">
      <Head>
        <title>Ada Quizzes</title>
        <link href="/adaicon.ico" rel="icon" />
      </Head>
      <div className="header">
        <DrawerMenu />
        <Heading>Nuevo quiz</Heading>
        <div />
      </div>
      <div className="main">
        <div className="logincard form">
          <QuizForm formId="add-quiz-form" quizForm={quizForm} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  console.log("new quiz GSSP");
  await dbConnect();
  const quiz = new Quiz();

  console.log("new quiz", quiz);
  const quizForm = quiz.toObject();

  quizForm._id = quizForm._id.toString();

  return { props: { quizForm } };
}

export default NewQuiz;
