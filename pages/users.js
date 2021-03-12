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

import dbConnect from "../utils/dbConnect";
import User from "../models/User";
import Footer from "../components/Footer";
import { DrawerMenu } from "../components/Drawer";

const UsersList = ({ users }) => (
  <div className="container">
    <Head>
      <title>Ada Users</title>
      <link href="/adaicon.ico" rel="icon" />
    </Head>
    <div className="header">
      <DrawerMenu />
      <Heading>Lista de Usuarios</Heading>
      <div />
    </div>
    <div className="main">
      <Text fontSize="xl">
        Conoce a todos los integrantes de nuestra organizacion.
      </Text>

      <Flex marginTop="1rem" width="100%">
        <Spacer />
        <Link href="/new">
          <Heading as="h3" size="sm">
            <a className="cursor"> Nuevo Usuario --&gt;&gt; </a>
          </Heading>
        </Link>
      </Flex>
      <div className="users-grid">
        {/* Create a card for each user */}
        {users.map((user) => (
          <div className="users-card" key={user._id}>
            <VStack>
              <img alt="user" className="user-image" src={user.image_url} />
              <Link as={`/${user._id}`} href="/[id]">
                <Heading as="h3" size="md">
                  &lt; {user.name} &#47;&gt;
                </Heading>
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
      <Link href="/new">
        <Button colorScheme="cyan" width="47%">
          Nuevo Usuario
        </Button>
      </Link>
    </div>
    <Footer />
  </div>
);

/* Retrieves user(s) data from mongodb database */
export async function getServerSideProps() {
  // abre coneccion primero, antes de usar el modelo
  await dbConnect();

  /* find all the data in the database */
  const result = await User.find({});

  /* returns an array with many docs(pets(objects))*/
  console.log("gSSP", result);

  /* create an array with all the docs (typeof doc = object)of the collection converted to objects */
  const users = result.map((doc) => {
    console.log("Type of doc", typeof doc);

    /*
     * toObject() Returns an object with each property name
     * and value corresponding to the entries in this collection.
     * Returns a cloned, vanilla object.
     */
    const user = doc.toObject();

    console.log("type of user", typeof user, user);
    user._id = user._id.toString();

    return user;
  });

  return { props: { users } };
}

export default UsersList;
