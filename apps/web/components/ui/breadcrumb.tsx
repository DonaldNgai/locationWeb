import * as React from "react"
import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem as ChakraBreadcrumbItem,
  BreadcrumbLink as ChakraBreadcrumbLink,
  BreadcrumbSeparator,
  type BreadcrumbProps,
  type BreadcrumbItemProps,
  type BreadcrumbLinkProps,
} from "@chakra-ui/react"

function Breadcrumb({ ...props }: BreadcrumbProps) {
  return <ChakraBreadcrumb aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}

function BreadcrumbList({ children, ...props }: React.ComponentProps<"nav">) {
  return <nav data-slot="breadcrumb-list" {...props}>{children}</nav>
}

function BreadcrumbItem({ className, ...props }: BreadcrumbItemProps) {
  return (
    <ChakraBreadcrumbItem
      data-slot="breadcrumb-item"
      className={className}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: BreadcrumbLinkProps & {
  asChild?: boolean
}) {
  return (
    <ChakraBreadcrumbLink
      data-slot="breadcrumb-link"
      className={className}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
