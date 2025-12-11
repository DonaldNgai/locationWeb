import { Kbd as ChakraKbd, type KbdProps } from "@chakra-ui/react"

function Kbd({ className, ...props }: KbdProps) {
  return (
    <ChakraKbd
      data-slot="kbd"
      className={className}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="kbd-group"
      className={className}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }
