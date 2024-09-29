import { C } from "../Chakra";
import { FormControl } from "../FormControl";

interface InputTextProps extends C.InputProps {
  label: string;
  helpText?: string;
}

export const InputText = ({ label, helpText, ...props }: InputTextProps) => {
  return (
    <FormControl label={label}>
      <C.Input
        bg="white"
        fontSize="12px"
        size={"sm"}
        _focus={{ ring: "none" }}
        {...props}
      />
    </FormControl>
  );
};
