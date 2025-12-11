import { Spinner as ChakraSpinner, type SpinnerProps } from "@chakra-ui/react"

function Spinner({ className, ...props }: SpinnerProps) {
  return (
    <ChakraSpinner
      role="status"
      aria-label="Loading"
      className={className}
      {...props}
    />
  )
}

export { Spinner }
