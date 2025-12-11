import * as React from "react";
import {
  Box,
  Card as ChakraCard,
  CardHeader as ChakraCardHeader,
  CardBody as ChakraCardBody,
  CardFooter as ChakraCardFooter,
  Heading,
  Text,
  type BoxProps,
} from "@chakra-ui/react";

function Card({ className, ...props }: BoxProps) {
  return (
    <ChakraCard
      data-slot="card"
      className={className}
      borderRadius="xl"
      py={6}
      gap={6}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: BoxProps) {
  return (
    <ChakraCardHeader
      data-slot="card-header"
      className={className}
      px={6}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: BoxProps) {
  return (
    <Heading
      data-slot="card-title"
      className={className}
      size="md"
      fontWeight="semibold"
      lineHeight="none"
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: BoxProps) {
  return (
    <Text
      data-slot="card-description"
      className={className}
      fontSize="sm"
      color="gray.500"
      _dark={{ color: "gray.400" }}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: BoxProps) {
  return (
    <Box
      data-slot="card-action"
      className={className}
      gridColumnStart={2}
      gridRowSpan={2}
      gridRowStart={1}
      alignSelf="start"
      justifySelf="end"
      {...props}
    />
  );
}

function CardContent({ className, ...props }: BoxProps) {
  return (
    <ChakraCardBody
      data-slot="card-content"
      className={className}
      px={6}
      pt={0}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: BoxProps) {
  return (
    <ChakraCardFooter
      data-slot="card-footer"
      className={className}
      px={6}
      pt={6}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent
};
