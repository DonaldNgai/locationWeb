"use client"

import * as React from "react"
import { Progress as ChakraProgress, type ProgressProps } from "@chakra-ui/react"

function Progress({
  className,
  value,
  ...props
}: ProgressProps) {
  return (
    <ChakraProgress
      data-slot="progress"
      className={className}
      value={value}
      {...props}
    />
  )
}

export { Progress }
