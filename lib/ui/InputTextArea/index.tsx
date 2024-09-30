import { C } from "../Chakra";
import { FormControl } from "../FormControl";

interface InputTextAreaProps extends C.TextareaProps {
  label: string;
  helpText?: string;
}

export const InputTextArea = ({
  label,
  helpText,
  ...props
}: InputTextAreaProps) => {
  return (
    <FormControl label={label}>
      <C.Textarea
        bg="white"
        size={"sm"}
        fontSize="12px"
        _focus={{ ring: "none" }}
        {...props}
      />
    </FormControl>
  );
};
