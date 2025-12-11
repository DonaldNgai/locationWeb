"use client"

import * as React from "react"
import {
  Tabs as ChakraTabs,
  TabList as ChakraTabList,
  TabPanels as ChakraTabPanels,
  Tab as ChakraTab,
  TabPanel as ChakraTabPanel,
  type TabsProps,
  type TabListProps,
  type TabProps,
  type TabPanelProps,
} from "@chakra-ui/react"

function Tabs({
  className,
  ...props
}: TabsProps) {
  return (
    <ChakraTabs
      data-slot="tabs"
      className={className}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: TabListProps) {
  return (
    <ChakraTabList
      data-slot="tabs-list"
      className={className}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: TabProps) {
  return (
    <ChakraTab
      data-slot="tabs-trigger"
      className={className}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: TabPanelProps) {
  return (
    <ChakraTabPanel
      data-slot="tabs-content"
      className={className}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
