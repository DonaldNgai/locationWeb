"use client"

import * as React from "react"
import {
  Popover as ChakraPopover,
  PopoverTrigger as ChakraPopoverTrigger,
  PopoverContent as ChakraPopoverContent,
  PopoverBody as ChakraPopoverBody,
  PopoverHeader as ChakraPopoverHeader,
  PopoverFooter as ChakraPopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  type PopoverProps,
  type PopoverContentProps,
} from "@chakra-ui/react"

function Popover({
  ...props
}: PopoverProps) {
  return <ChakraPopover data-slot="popover" {...props} />
}

function PopoverTrigger({
  children,
  ...props
}: React.ComponentProps<typeof ChakraPopoverTrigger>) {
  return (
    <ChakraPopoverTrigger data-slot="popover-trigger" {...props}>
      {children}
    </ChakraPopoverTrigger>
  )
}

function PopoverContent({
  className,
  ...props
}: PopoverContentProps) {
  return (
    <ChakraPopoverContent
      data-slot="popover-content"
      className={className}
      {...props}
    />
  )
}

function PopoverAnchor({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return <div data-slot="popover-anchor" {...props}>{children}</div>
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
