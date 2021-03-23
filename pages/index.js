import Head from "next/head";
import { useState } from "react";
import { Button, Input, Stack, Text, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Footer from "../components/Footer";

const API = "http://localhost:3000/api";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const router = useRouter();

  const handleAccessError = () => {
    setErrorText("Error de acceso, intentelo nuevamente.");
  };
  const handleAccessAllowed = (userID) => {
    console.log("-> handleAccessAllowed", userID);
    // TODO send bkend userID
    router.push("/userQuizzes");
  };
  const handleLogin = async () => {
    console.log("-> handleLogin");

    if (!userName) {
      handleAccessAllowed();
    } else {
      const response = await fetch(`${API}/users/login`, {
        body: JSON.stringify({
          password: userPassword,
          user: userName,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const json = await response.json();

      console.log("handleLogin response:", json);

      if (json.access) {
        handleAccessAllowed(json.user.id);
      } else {
        handleAccessError();
      }
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Ada Quizzes</title>
        <link href="/adaicon.ico" rel="icon" />
      </Head>
      <main className="loginmain">
        <div className="logincard">
          <Heading as="h3" size="lg">
            Ada Quizzes &rarr;
          </Heading>

          <Stack spacing={3}>
            <Text>
              Log in to test your knowledge as a Full Stack Javascript
              Developer!
            </Text>
            <Input
              name="user-name"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              type="text"
              value={userName}
            />
            <Input
              name="user-password"
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="contrasena"
              type="text"
              value={userPassword}
            />
            <Text>{errorText}</Text>
            <Button colorScheme="cyan" onClick={handleLogin}>
              Log in
            </Button>
          </Stack>
        </div>
      </main>
      <Footer />
    </div>
  );
}
