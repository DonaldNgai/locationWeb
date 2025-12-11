"use client"

import * as React from "react"
import { Switch as ChakraSwitch, type SwitchProps } from "@chakra-ui/react"

function Switch({
  className,
  ...props
}: SwitchProps) {
  return (
    <ChakraSwitch
      data-slot="switch"
      className={className}
      {...props}
    />
  )
}

export { Switch }
