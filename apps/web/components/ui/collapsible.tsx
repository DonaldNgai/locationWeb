"use client"

import {
  Collapse as ChakraCollapse,
  useDisclosure,
  type CollapseProps,
} from "@chakra-ui/react"
import * as React from "react"

function Collapsible({
  open,
  onOpenChange,
  children,
  ...props
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
} & Omit<CollapseProps, "in">) {
  const disclosure = useDisclosure({
    isOpen: open,
    onOpen: () => onOpenChange?.(true),
    onClose: () => onOpenChange?.(false),
  })

  return (
    <ChakraCollapse
      data-slot="collapsible"
      in={disclosure.isOpen}
      {...props}
    >
      {children}
    </ChakraCollapse>
  )
}

function CollapsibleTrigger({
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button data-slot="collapsible-trigger" {...props}>
      {children}
    </button>
  )
}

function CollapsibleContent({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="collapsible-content" {...props}>
      {children}
    </div>
  )
}

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
