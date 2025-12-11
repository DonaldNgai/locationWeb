"use client";

import * as React from "react";
import { FormLabel, type FormLabelProps } from "@chakra-ui/react";

function Label({
  className,
  ...props
}: FormLabelProps) {
  return (
    <FormLabel
      data-slot="label"
      className={className}
      fontSize="sm"
      fontWeight="medium"
      mb={0}
      {...props}
    />
  );
}

export { Label };
