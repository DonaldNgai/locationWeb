"use client"

import * as React from "react"
import { Checkbox as ChakraCheckbox, type CheckboxProps } from "@chakra-ui/react"

function Checkbox({
  className,
  ...props
}: CheckboxProps) {
  return (
    <ChakraCheckbox
      data-slot="checkbox"
      className={className}
      {...props}
    />
  )
}

export { Checkbox }
