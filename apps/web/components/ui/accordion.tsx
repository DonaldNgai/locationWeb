"use client"

import * as React from "react"
import {
  Accordion as ChakraAccordion,
  AccordionItem as ChakraAccordionItem,
  AccordionButton as ChakraAccordionButton,
  AccordionPanel as ChakraAccordionPanel,
  AccordionIcon,
  type AccordionProps,
  type AccordionItemProps,
} from "@chakra-ui/react"

function Accordion({
  ...props
}: AccordionProps) {
  return <ChakraAccordion data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: AccordionItemProps) {
  return (
    <ChakraAccordionItem
      data-slot="accordion-item"
      className={className}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ChakraAccordionButton>) {
  return (
    <ChakraAccordionButton
      data-slot="accordion-trigger"
      className={className}
      {...props}
    >
      {children}
      <AccordionIcon />
    </ChakraAccordionButton>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ChakraAccordionPanel>) {
  return (
    <ChakraAccordionPanel
      data-slot="accordion-content"
      className={className}
      {...props}
    >
      {children}
    </ChakraAccordionPanel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
