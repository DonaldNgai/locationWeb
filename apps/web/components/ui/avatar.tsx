"use client";

import * as React from "react";
import {
  Avatar as ChakraAvatar,
  AvatarImage as ChakraAvatarImage,
  AvatarBadge as ChakraAvatarBadge,
  type AvatarProps,
  type AvatarImageProps,
} from "@chakra-ui/react";

function Avatar({
  className,
  ...props
}: AvatarProps) {
  return (
    <ChakraAvatar
      data-slot="avatar"
      className={className}
      size="md"
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: AvatarImageProps) {
  return (
    <ChakraAvatarImage
      data-slot="avatar-image"
      className={className}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-fallback"
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
