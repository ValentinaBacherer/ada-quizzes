import Head from "next/head";
import { useState } from "react";
import { Button, Input, Stack, Text, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const API = "http://localhost:3000/api";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const router = useRouter();

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };
  const handleLogin = async () => {
    console.log("En handleLogin");
    const response = await fetch(`${API}/login-api`, {
      body: JSON.stringify({
        password: userPassword,
        user: userName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    const json = await response.json();

    console.log(json);

    if (json.access) {
      router.push("/quizlist");
    } else {
      setUserPassword("");
      setErrorText("Error de acceso, intentelo nuevamente.");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Ada Quizzes</title>
        <link rel="icon" href="/adaicon.ico" />
      </Head>
      <main className={styles.loginmain}>
        <div className={styles.logincard}>
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
              onChange={handleNameChange}
              placeholder="Username"
              type="text"
              value={userName}
            ></Input>
            <Input
              name="user-password"
              onChange={handlePasswordChange}
              placeholder="Password"
              type="password"
              value={userPassword}
            ></Input>
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
