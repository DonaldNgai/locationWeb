"use client"

import * as React from "react"
import {
  Tooltip as ChakraTooltip,
  type TooltipProps,
} from "@chakra-ui/react"

function Tooltip({
  ...props
}: TooltipProps) {
  return (
    <ChakraTooltip
      data-slot="tooltip"
      {...props}
    />
  )
}

// For backward compatibility
function TooltipTrigger({ children, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="tooltip-trigger" {...props}>{children}</div>
}

function TooltipContent({ children, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="tooltip-content" {...props}>{children}</div>
}

function TooltipProvider({ children, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="tooltip-provider" {...props}>{children}</div>
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
