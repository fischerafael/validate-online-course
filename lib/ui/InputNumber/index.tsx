import { C } from "../Chakra";
import { FormControl } from "../FormControl";

interface InputTextProps extends C.NumberInputProps {
  label: string;
  helpText?: string;
}

export const InputNumber = ({ label, helpText, ...props }: InputTextProps) => {
  return (
    <FormControl label={label}>
      <C.NumberInput fontSize="12px" w="full" bg="white" size={"sm"} {...props}>
        <C.NumberInputField _focus={{ ring: "none" }} w="full" />
        <C.NumberInputStepper>
          <C.NumberIncrementStepper />
          <C.NumberDecrementStepper />
        </C.NumberInputStepper>
      </C.NumberInput>
    </FormControl>
  );
};
