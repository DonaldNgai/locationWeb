"use client"

import * as React from "react"
import { Divider, type DividerProps } from "@chakra-ui/react"

interface SeparatorProps extends Omit<DividerProps, "orientation"> {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  return (
    <Divider
      data-slot="separator"
      orientation={orientation}
      className={className}
      {...props}
    />
  )
}

export { Separator }
