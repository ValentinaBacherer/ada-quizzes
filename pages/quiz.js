import { RadioGroup, Radio, Stack, Text, Heading } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";

import Footer from "../components/Footer";
import { DrawerMenu } from "../components/Drawer";
import styles from "../styles/Home.module.css";

const Quiz = () => {
  const [value, setValue] = useState("1");

  return (
    <div className={styles.container}>
      <Head>
        <title>Ada Quizzes</title>
        <link rel="icon" href="/adaicon.ico" />
      </Head>
      <div className={styles.header}>
        <DrawerMenu />
        <Heading>MongoDB</Heading>
        <div></div>
      </div>

      <main className={styles.main}>
        <div className={styles.grid}>
          <div className={styles.logincard}>
            <Text mb={4}>Que es mongodb?</Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="column">
                <Radio value="1">Una base de datos no relacional</Radio>
                <Radio value="2">Un framework</Radio>
                <Radio value="3">Una libreria</Radio>
              </Stack>
            </RadioGroup>
          </div>
          <div className={styles.logincard}>
            <Text mb={4}>Que es nodejs?</Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="column">
                <Radio value="1">Un motor de ejecucion de javascript</Radio>
                <Radio value="2">Un contexto</Radio>
                <Radio value="3">Una libreria</Radio>
              </Stack>
            </RadioGroup>
          </div>
          <div className={styles.logincard}>
            <Text mb={4}>Que es nodejs?</Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="column">
                <Radio value="1">Un motor de ejecucion de javascript</Radio>
                <Radio value="2">Un contexto</Radio>
                <Radio value="3">Una libreria</Radio>
              </Stack>
            </RadioGroup>
          </div>
          <div className={styles.logincard}>
            <Text mb={4}>Que es nodejs?</Text>
            <RadioGroup onChange={setValue} value={value}>
              <Stack direction="column">
                <Radio value="1">Un motor de ejecucion de javascript</Radio>
                <Radio value="2">Un contexto</Radio>
                <Radio value="3">Una libreria</Radio>
              </Stack>
            </RadioGroup>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quiz;
