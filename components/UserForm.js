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
import { clearConfigCache } from "prettier";

/*
 * formId to modify , userForm an object with user data
 * for new, to create a new one
 */
const UserForm = ({ formId, userForm, forNewUser = true }) => {
  const router = useRouter();
  const contentType = "application/json";
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  console.log("User en userForm:", userForm);
  const [form, setForm] = useState({
    ada_student: userForm.ada_student,
    age: userForm.age,
    dislikes: userForm.dislikes,
    image_url: userForm.image_url,
    languages: userForm.languages,
    likes: userForm.likes,
    name: userForm.name,
    organization: userForm.organization,
    password: userForm.password,
  });

  console.log(form);
  /* The PUT method edits an existing entry in the mongodb database. */

  const putData = async (formPut) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/users/${id}`, {
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

      mutate(`/api/users/${id}`, data, false); // Update the local data without a revalidation
      router.push("/users");
    } catch (error) {
      setMessage("Failed to update user");
    }
  };

  /* The POST method adds a new entry in the mongodb database. */
  const postData = async (formPost) => {
    try {
      const res = await fetch("/api/users", {
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

      router.push("/users");
    } catch (error) {
      setMessage("Failed to add user");
    }
  };

  const handleChange = (e) => {
    const target = e.target;
    const value = target.name === "ada_student" ? target.checked : target.value;
    /* the field name*/
    const name = target.name;

    setForm({
      ...form,
      [name]: value,
    });
  };

  /* Makes sure user info is filled for  name, password, species, and image url*/
  const formValidate = () => {
    const err = {};

    if (!form.name) err.name = "Name is required";

    if (!form.password) err.password = "Password is required";

    if (!form.languages) err.languages = "Languages is required";

    if (!form.image_url) err.image_url = "Image URL is required";

    return err;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewUser ? postData(form) : putData(form);
    } else {
      setErrors(errs);
    }
  };

  return (
    <>
      <FormControl id={formId} onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <InputGroup>
            <InputLeftAddon children="Name" w="130px" />
            <Input
              id="name"
              maxLength="20"
              name="name"
              onChange={handleChange}
              placeholder="user name"
              required
              type="text"
              value={form.name}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Password" w="130px" />
            <Input
              maxLength="20"
              name="password"
              onChange={handleChange}
              placeholder="password"
              required
              type="text"
              value={form.password}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Organization" w="130px" />
            <Input
              maxLength="30"
              name="organization"
              onChange={handleChange}
              placeholder="user organization"
              required
              type="text"
              value={form.organization}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Age" w="130px" />
            <NumberInput max={120} min={10}>
              <NumberInputField
                maxWidth="47vw"
                name="user age"
                onChange={handleChange}
                placeholder="user age"
                required
                type="number"
                value={form.age}
                width="28.7rem"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </InputGroup>
          <CheckboxGroup colorScheme="cyan">
            <HStack>
              <Spacer />
              <Checkbox
                checked={form.ada_student}
                name="ada_student"
                onChange={handleChange}
                type="checkbox"
              >
                Ada Student
              </Checkbox>
              <Spacer />
            </HStack>
          </CheckboxGroup>
          <InputGroup>
            <InputLeftAddon children="Languages" w="130px" />
            <Input
              maxLength="60"
              name="languages"
              onChange={handleChange}
              placeholder="user languages"
              type="text"
              value={form.languages}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Image URL" w="130px" />
            <Input
              maxLength="150"
              name="image_url"
              onChange={handleChange}
              placeholder="user image URL"
              type="url"
              value={form.image_url}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Likes/hobbies" height="20" w="130px" />
            <Textarea
              name="likes"
              onChange={handleChange}
              placeholder="Write here users preferences..."
              value={form.likes}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children="Dislikes" height="20" w="130px" />
            <Textarea
              name="dislikes"
              onChange={handleChange}
              placeholder="Write here users preferences..."
              value={form.dislikes}
            />
          </InputGroup>
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

export default UserForm;
