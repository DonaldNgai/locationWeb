"use client"

import * as React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  type UseDisclosureReturn,
  type ModalProps,
} from "@chakra-ui/react"

// For backward compatibility, create a wrapper that uses Chakra Modal
function Dialog({
  open,
  onOpenChange,
  children,
  ...props
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
} & Omit<ModalProps, "isOpen" | "onClose">) {
  const disclosure = useDisclosure({
    isOpen: open,
    onOpen: () => onOpenChange?.(true),
    onClose: () => onOpenChange?.(false),
  })

  return (
    <Modal
      data-slot="dialog"
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      {...props}
    >
      {children}
    </Modal>
  )
}

function DialogTrigger({
  children,
  asChild,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  return (
    <button data-slot="dialog-trigger" {...props}>
      {children}
    </button>
  )
}

function DialogPortal({ children, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-portal" {...props}>{children}</div>
}

function DialogClose({ children, ...props }: React.ComponentProps<"button">) {
  return (
    <button data-slot="dialog-close" {...props}>
      {children}
    </button>
  )
}

function DialogOverlay({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <ModalOverlay
      data-slot="dialog-overlay"
      className={className}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof ModalContent> & {
  showCloseButton?: boolean
}) {
  return (
    <ModalContent
      data-slot="dialog-content"
      className={className}
      {...props}
    >
      {showCloseButton && <ModalCloseButton />}
      {children}
    </ModalContent>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<typeof ModalHeader>) {
  return (
    <ModalHeader
      data-slot="dialog-header"
      className={className}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<typeof ModalFooter>) {
  return (
    <ModalFooter
      data-slot="dialog-footer"
      className={className}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof ModalHeader>) {
  return (
    <ModalHeader
      data-slot="dialog-title"
      className={className}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof ModalBody>) {
  return (
    <ModalBody
      data-slot="dialog-description"
      className={className}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
