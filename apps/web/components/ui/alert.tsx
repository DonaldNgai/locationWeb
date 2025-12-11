import * as React from "react"
import {
  Alert as ChakraAlert,
  AlertTitle as ChakraAlertTitle,
  AlertDescription as ChakraAlertDescription,
  type AlertProps,
} from "@chakra-ui/react"

type AlertVariant = "default" | "destructive"

interface CustomAlertProps extends Omit<AlertProps, "status"> {
  variant?: AlertVariant
}

function Alert({
  className,
  variant = "default",
  ...props
}: CustomAlertProps) {
  const status = variant === "destructive" ? "error" : "info"
  
  return (
    <ChakraAlert
      data-slot="alert"
      role="alert"
      className={className}
      status={status}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<typeof ChakraAlertTitle>) {
  return (
    <ChakraAlertTitle
      data-slot="alert-title"
      className={className}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof ChakraAlertDescription>) {
  return (
    <ChakraAlertDescription
      data-slot="alert-description"
      className={className}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
