import { useState } from "react";
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
  Radio,
  RadioGroup,
  Text,
  Textarea,
  Heading,
} from "@chakra-ui/react";

const SelectAnswer = ({ groupName, options }) => {
  const [selectedValue, setSelectedValue] = useState("");

  console.log("->Select options", options);

  const handleChange = (e) => {
    const value = e.target.value;

    setSelectedValue(value);
  };

  return (
    <>
      <Heading size="sm">
        {groupName}: {selectedValue}
      </Heading>
      <RadioGroup>
        <Stack spacing={3}>
          {options.map((option, index) => {
            return (
              <Radio
                checked={selectedValue === option}
                colorScheme="cyan"
                key={index}
                name={groupName}
                onChange={handleChange}
                value={option}
              >
                {option}
              </Radio>
            );
          })}
        </Stack>
      </RadioGroup>
    </>
  );
};

export default SelectAnswer;
