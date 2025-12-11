"use client";

import * as React from "react";
import {
  RadioGroup as ChakraRadioGroup,
  Radio as ChakraRadio,
  type RadioGroupProps,
  type RadioProps,
} from "@chakra-ui/react";

function RadioGroup({
  className,
  ...props
}: RadioGroupProps) {
  return (
    <ChakraRadioGroup
      data-slot="radio-group"
      className={className}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: RadioProps) {
  return (
    <ChakraRadio
      data-slot="radio-group-item"
      className={className}
      {...props}
    />
  );
}

export { RadioGroup, RadioGroupItem };
