"use client"

import * as React from "react"
import { Slider as ChakraSlider, type SliderProps } from "@chakra-ui/react"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: SliderProps) {
  return (
    <ChakraSlider
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={className}
      {...props}
    />
  )
}

export { Slider }
