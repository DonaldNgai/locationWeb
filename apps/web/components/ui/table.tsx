"use client"

import * as React from "react"
import {
  Table as ChakraTable,
  Thead as ChakraThead,
  Tbody as ChakraTbody,
  Tfoot as ChakraTfoot,
  Tr as ChakraTr,
  Th as ChakraTh,
  Td as ChakraTd,
  TableContainer,
  type TableProps,
  type TheadProps,
  type TbodyProps,
  type TfootProps,
  type TrProps,
  type ThProps,
  type TdProps,
} from "@chakra-ui/react"

function Table({ className, ...props }: TableProps) {
  return (
    <TableContainer>
      <ChakraTable
        data-slot="table"
        className={className}
        {...props}
      />
    </TableContainer>
  )
}

function TableHeader({ className, ...props }: TheadProps) {
  return (
    <ChakraThead
      data-slot="table-header"
      className={className}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: TbodyProps) {
  return (
    <ChakraTbody
      data-slot="table-body"
      className={className}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: TfootProps) {
  return (
    <ChakraTfoot
      data-slot="table-footer"
      className={className}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: TrProps) {
  return (
    <ChakraTr
      data-slot="table-row"
      className={className}
      _hover={{ bg: "gray.50" }}
      _dark={{ _hover: { bg: "gray.800" } }}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: ThProps) {
  return (
    <ChakraTh
      data-slot="table-head"
      className={className}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: TdProps) {
  return (
    <ChakraTd
      data-slot="table-cell"
      className={className}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={className}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
