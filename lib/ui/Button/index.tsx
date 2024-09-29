import { C } from "../Chakra";

interface ButtonProps extends C.ButtonProps {
  children: React.ReactNode;
}

export const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <C.Button fontSize="sm" size={"sm"} fontWeight="semi-bold" {...props}>
      {children}
    </C.Button>
  );
};
