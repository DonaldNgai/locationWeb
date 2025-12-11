"use client"

import { AspectRatio as ChakraAspectRatio, type AspectRatioProps } from "@chakra-ui/react"

function AspectRatio({
  ...props
}: AspectRatioProps) {
  return <ChakraAspectRatio data-slot="aspect-ratio" {...props} />
}

export { AspectRatio }
