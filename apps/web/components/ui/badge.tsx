import * as React from "react"
import { Badge as ChakraBadge, type BadgeProps as ChakraBadgeProps } from "@chakra-ui/react"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

interface BadgeProps extends Omit<ChakraBadgeProps, "variant" | "colorScheme"> {
  variant?: BadgeVariant
  asChild?: boolean
}

const variantMap: Record<BadgeVariant, { variant: ChakraBadgeProps["variant"]; colorScheme?: ChakraBadgeProps["colorScheme"] }> = {
  default: { variant: "solid", colorScheme: "gray" },
  secondary: { variant: "subtle", colorScheme: "gray" },
  destructive: { variant: "solid", colorScheme: "red" },
  outline: { variant: "outline", colorScheme: "gray" },
}

function Badge({
  variant = "default",
  asChild = false,
  className,
  ...props
}: BadgeProps) {
  const { variant: chakraVariant, colorScheme } = variantMap[variant]

  return (
    <ChakraBadge
      data-slot="badge"
      variant={chakraVariant}
      colorScheme={colorScheme}
      className={className}
      fontSize="xs"
      px={2}
      py={0.5}
      borderRadius="md"
      {...props}
    />
  )
}

// Export badgeVariants for backward compatibility
const badgeVariants = {
  default: "default",
  secondary: "secondary",
  destructive: "destructive",
  outline: "outline",
} as const

export { Badge, badgeVariants }
