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
import User from "../../../models/User";
import Footer from "../../../components/Footer";
import { DrawerMenu } from "../../../components/Drawer";

/* Allows you to view user card info and delete pet card*/
const UserPage = ({ user }) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const handleDelete = async () => {
    const userID = router.query.id;

    try {
      await fetch(`/api/users/${userID}`, {
        method: "Delete",
      });
      router.push("/users");
    } catch (error) {
      setMessage("Failed to delete the user.");
    }
  };

  return (
    <div className="container" key={user._id}>
      <Head>
        <title>Ada Users</title>
        <link href="/adaicon.ico" rel="icon" />
      </Head>
      <div className="header">
        <DrawerMenu />
        <Heading>Datos de usuario</Heading>
        <div />
      </div>
      <div className="main">
        <div className="grid">
          <div className="logincard">
            <VStack>
              <Heading as="h2" size="lg">
                {user.name}
              </Heading>
              <img alt="user" className="user-image" src={user.image_url} />
            </VStack>
            <VStack align="left">
              <Text fontSize="lg">password: {user.password}</Text>
              <Heading as="h2" size="md">
                Likes
              </Heading>

              <UnorderedList>
                {user.likes.map((data, index) => (
                  <ListItem key={index} mx="5%">
                    {data}{" "}
                  </ListItem>
                ))}
              </UnorderedList>

              <Heading as="h2" size="md">
                Dislikes
              </Heading>
              <UnorderedList>
                {user.dislikes.map((data, index) => (
                  <ListItem key={index} mx="5%">
                    {data}
                  </ListItem>
                ))}
              </UnorderedList>

              <Flex>
                <Link as={`/users/${user._id}/edit`} href="/users/[id]/edit">
                  <Button colorScheme="cyan" width="65%">
                    Editar
                  </Button>
                </Link>
                <Spacer />
                <Link as={`/users/${user._id}/edit`} href="/users/[id]/edit">
                  {/* revisar */}
                  <Button
                    colorScheme="yellow"
                    onClick={handleDelete}
                    width="30%"
                  >
                    Borrar
                  </Button>
                </Link>
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

  const user = await User.findById(params.id).lean();

  user._id = user._id.toString();

  return { props: { user } };
}

export default UserPage;
