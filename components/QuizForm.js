/* eslint-disable react/no-children-prop */
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-unused-expressions */
import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import {
  Button,
  Stack,
  Spacer,
  InputGroup,
  InputLeftAddon,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  CheckboxGroup,
  Checkbox,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Textarea,
} from "@chakra-ui/react";

import SelectAnswer from "./SelectAnswer";

/*
 * formId to modify , userForm an object with user data
 * for new, to create a new one
 */
const QuizForm = ({ formId, quizForm, forNewQuiz = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  console.log("User en quizForm:", quizForm);
  const [form, setForm] = useState(
    quizForm ?? {
      difficulty: "empty",
      title: "no title",
    }
  );

  console.log(form);
  /* The PUT method edits an existing entry in the mongodb database. */

  const putData = async (formPut) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/quizzes/${id}`, {
        body: JSON.stringify(formPut),
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        method: "PUT",
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      mutate(`/api/quizzes/${id}`, data, false); // Update the local data without a revalidation
      router.push("/quizzes");
    } catch (error) {
      setMessage("Failed to update quiz");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (formPost) => {
    try {
      const res = await fetch("/api/quizzes", {
        body: JSON.stringify(formPost),
        headers: {
          Accept: contentType,
          "Content-Type": contentType,
        },
        method: "POST",
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push("/quizzes");
    } catch (error) {
      setMessage("Failed to add quizz");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure user info is filled for  name, password, species, and image url*/
  const formValidate = () => {
    const err = {};

    if (!form.title) err.name = "Title is required";

    if (!form.difficulty) err.difficulty = "Difficulty is required";

    return err;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewQuiz ? postData(form) : putData(form);
    } else {
      setErrors(errs);
    }
  };

  return (
    <>
      <FormControl id={formId} onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <InputGroup>
            <InputLeftAddon children="Title" w="130px" />
            <Input
              id="title"
              maxLength="200"
              name="title"
              onChange={handleChange}
              placeholder="Quiz title"
              required
              type="text"
              value={form.title}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Difficulty" w="130px" />
            <Input
              maxLength="20"
              name="difficulty"
              onChange={handleChange}
              placeholder="difficulty"
              required
              type="text"
              value={form.difficulty}
            />
          </InputGroup>
          <SelectAnswer
            groupName="¿Que es React?"
            options={[
              "Una nueva moda",
              "Una libreria para nodejs",
              "Un framework de trabajo",
            ]}
          />
        </Stack>
        <Button
          colorScheme="cyan"
          mt="5"
          onClick={handleSubmit}
          type="submit"
          width="100%"
        >
          Submit
        </Button>
      </FormControl>
      <Text>{message}</Text>
      <Text>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{err}</li>
        ))}
      </Text>
    </>
  );
};

export default QuizForm;
