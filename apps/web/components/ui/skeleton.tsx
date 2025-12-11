import { Skeleton as ChakraSkeleton, type SkeletonProps } from "@chakra-ui/react"

function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <ChakraSkeleton
      data-slot="skeleton"
      className={className}
      {...props}
    />
  )
}

export { Skeleton }
