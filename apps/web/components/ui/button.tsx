import * as React from "react";
import { Button as ChakraButton, type ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends Omit<ChakraButtonProps, "variant" | "size"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantMap: Record<ButtonVariant, ChakraButtonProps["variant"]> = {
  default: "solid",
  destructive: "solid",
  outline: "outline",
  secondary: "subtle",
  ghost: "ghost",
  link: "link",
};

const sizeMap: Record<ButtonSize, ChakraButtonProps["size"]> = {
  default: "md",
  sm: "sm",
  lg: "lg",
  icon: "sm",
};

function Button({
  variant = "default",
  size = "default",
  asChild = false,
  colorScheme,
  ...props
}: ButtonProps) {
  const chakraVariant = variantMap[variant];
  const chakraSize = sizeMap[size];
  
  // Map color scheme based on variant
  let finalColorScheme = colorScheme;
  if (variant === "destructive") {
    finalColorScheme = "red";
  } else if (variant === "default") {
    finalColorScheme = "gray";
  }

  // Handle icon size
  const isIcon = size === "icon";
  const iconProps = isIcon ? { w: "36px", h: "36px", p: 0 } : {};

  return (
    <ChakraButton
      data-slot="button"
      variant={chakraVariant}
      size={chakraSize}
      colorScheme={finalColorScheme}
      {...iconProps}
      {...props}
    />
  );
}

// Export buttonVariants for backward compatibility (if needed elsewhere)
const buttonVariants = {
  default: "default",
  destructive: "destructive",
  outline: "outline",
  secondary: "secondary",
  ghost: "ghost",
  link: "link",
} as const;

export { Button, buttonVariants };
