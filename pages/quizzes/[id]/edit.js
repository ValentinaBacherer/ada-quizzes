import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
import { Heading } from "@chakra-ui/react";

import QuizForm from "../../../components/QuizForm";
import { DrawerMenu } from "../../../components/Drawer";
import Footer from "../../../components/Footer";

/* retorna json.data promise*/
const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditQuiz = () => {
  const router = useRouter();
  const { id } = router.query;

  /*
   * SWR is a strategy to first return the data from cache (stale-rancio),
   * then send the fetch request (revalidate), and finally come with the up-to-date data. -> readme
   */
  const { data: quiz, error } = useSWR(
    id ? `/api/quizzes/${id}` : null,
    fetcher
  );

  if (error) return <p>Failed to load</p>;

  if (!quiz) return <p>Loading...</p>;

  const quizForm = {
    ...quiz,
  };

  return (
    <div className="container">
      <Head>
        <title>Ada Quizzes</title>
        <link href="/adaicon.ico" rel="icon" />
      </Head>
      <div className="header">
        <DrawerMenu />
        <Heading>Editar quiz</Heading>
        <div />
      </div>
      <div className="main">
        <div className="logincard form">
          <QuizForm
            forNewQuiz={false}
            formId="edit-user-form"
            quizForm={quizForm}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditQuiz;
