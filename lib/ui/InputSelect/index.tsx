import { C } from "../Chakra";
import { FormControl } from "../FormControl";

export interface IOption {
  key: string;
  value: string;
}

export interface InputSelectProps extends C.SelectProps {
  label: string;
  options?: IOption[];
  helpText?: string;
  placeholder?: string;
}

export const InputSelect = ({
  label,
  helpText,
  options,
  placeholder,
  ...props
}: InputSelectProps) => {
  const isEnabled = !!options && options.length > 0;

  return (
    <FormControl label={label}>
      <C.Select
        fontSize="12px"
        bg="white"
        size={"sm"}
        isDisabled={!isEnabled}
        {...props}
      >
        {placeholder && (
          <option
            style={{ color: "lightGray" }}
            disabled={true}
            selected={true}
          >
            {placeholder}
          </option>
        )}
        {options?.map((op) => (
          <option key={op.key}>{op.value}</option>
        ))}
      </C.Select>
    </FormControl>
  );
};
