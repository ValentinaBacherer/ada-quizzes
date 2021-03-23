import { Heading } from "@chakra-ui/react";
import Head from "next/head";

import UserForm from "../../components/UserForm";
import { DrawerMenu } from "../../components/Drawer";
import User from "../../models/User";
import dbConnect from "../../utils/dbConnect";
import Footer from "../../components/Footer";

const NewUser = ({ userForm }) => {
  return (
    <div className="container">
      <Head>
        <title>Ada Users</title>
        <link href="/adaicon.ico" rel="icon" />
      </Head>
      <div className="header">
        <DrawerMenu />
        <Heading>Nuevo usuario</Heading>
        <div />
      </div>
      <div className="main">
        <div className="logincard form">
          <UserForm formId="add-user-form" userForm={userForm} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export async function getServerSideProps() {
  await dbConnect();
  const user = new User({});
  const userForm = user.toObject();

  userForm._id = userForm._id.toString();
  console.log(userForm);

  return { props: { userForm } };
}

export default NewUser;
