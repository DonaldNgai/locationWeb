import * as React from "react"
import { Textarea as ChakraTextarea, type TextareaProps } from "@chakra-ui/react"

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <ChakraTextarea
      data-slot="textarea"
      className={className}
      minH="64px"
      {...props}
    />
  )
}

export { Textarea }
