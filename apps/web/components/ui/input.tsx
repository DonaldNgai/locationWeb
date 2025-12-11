import * as React from "react";
import { Input as ChakraInput, type InputProps as ChakraInputProps } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  type?: string;
}

function Input({ type, ...props }: InputProps) {
  return (
    <ChakraInput
      type={type}
      data-slot="input"
      h="36px"
      {...props}
    />
  );
}

export { Input };
