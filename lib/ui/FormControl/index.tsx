import React from "react";
import { C } from "../Chakra";

export const FormControl = ({
  label,
  helpText,
  children,
}: {
  label: string;
  children: React.ReactNode;
  helpText?: string;
}) => {
  return (
    <C.FormControl as={C.VStack} align="flex-start" w="full" spacing="0">
      <C.FormLabel fontWeight="regular" fontSize="xs" w="full">
        {label}
      </C.FormLabel>
      {children}
      {helpText && (
        <C.FormHelperText fontSize="xs" w="full">
          {helpText}
        </C.FormHelperText>
      )}
    </C.FormControl>
  );
};
