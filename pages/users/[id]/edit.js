import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
import { Heading } from "@chakra-ui/react";

import UserForm from "../../../components/UserForm";
import { DrawerMenu } from "../../../components/Drawer";
import Footer from "../../../components/Footer";

/* retorna json.data promise*/
const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditUser = () => {
  const router = useRouter();
  const { id } = router.query;

  /*
   * SWR is a strategy to first return the data from cache (stale-rancio),
   * then send the fetch request (revalidate), and finally come with the up-to-date data. -> readme
   */
  const { data: user, error } = useSWR(id ? `/api/users/${id}` : null, fetcher);

  if (error) return <p>Failed to load</p>;

  if (!user) return <p>Loading...</p>;

  const userForm = {
    ada_student: user.ada_student,
    age: user.age,
    dislikes: user.dislikes,
    image_url: user.image_url,
    languages: user.languages,
    likes: user.likes,
    name: user.name,
    organization: user.organization,
    password: user.password,
  };

  return (
    <div className="container">
      <Head>
        <title>Ada Users</title>
        <link href="/adaicon.ico" rel="icon" />
      </Head>
      <div className="header">
        <DrawerMenu />
        <Heading>Editar usuario</Heading>
        <div />
      </div>
      <div className="main">
        <div className="logincard form">
          <UserForm
            forNewUser={false}
            formId="edit-user-form"
            userForm={userForm}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditUser;
