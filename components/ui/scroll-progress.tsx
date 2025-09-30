'use client'

import {
  motion,
  SpringOptions,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { cn } from '@/lib/utils'
import { RefObject } from 'react'

export type ScrollProgressProps = {
  className?: string
  springOptions?: SpringOptions
  containerRef?: RefObject<HTMLDivElement>
}

const DEFAULT_SPRING_OPTIONS: SpringOptions = {
  stiffness: 200,
  damping: 50,
  restDelta: 0.001,
}

// Smooth color interpolation function
const interpolateColor = (progress: number) => {
  // Define color stops for smooth interpolation
  const colors = [
    { pos: 0, r: 239, g: 68, b: 68 }, // red-500
    { pos: 0.33, r: 245, g: 158, b: 11 }, // amber-500
    { pos: 0.66, r: 16, g: 185, b: 129 }, // emerald-500
    { pos: 1, r: 59, g: 130, b: 246 }, // blue-500
  ]

  // Find the two colors to interpolate between
  let color1 = colors[0]
  let color2 = colors[0]

  for (let i = 0; i < colors.length - 1; i++) {
    if (progress >= colors[i].pos && progress <= colors[i + 1].pos) {
      color1 = colors[i]
      color2 = colors[i + 1]
      break
    }
  }

  // Calculate interpolation factor
  const factor = (progress - color1.pos) / (color2.pos - color1.pos)

  // Interpolate RGB values
  const r = Math.round(color1.r + (color2.r - color1.r) * factor)
  const g = Math.round(color1.g + (color2.g - color1.g) * factor)
  const b = Math.round(color1.b + (color2.b - color1.b) * factor)

  return `rgb(${r}, ${g}, ${b})`
}

export function ScrollProgress({
  className,
  springOptions,
  containerRef,
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll({
    container: containerRef,
    layoutEffect: Boolean(containerRef?.current),
  })

  const scaleX = useSpring(scrollYProgress, {
    ...DEFAULT_SPRING_OPTIONS,
    ...(springOptions ?? {}),
  })

  // Transform scroll progress to color with smooth interpolation
  const backgroundColor = useTransform(scrollYProgress, (value) =>
    interpolateColor(value),
  )

  return (
    <motion.div
      className={cn('inset-x-0 top-0 h-1 origin-left shadow-lg', className)}
      style={{
        scaleX,
        backgroundColor,
      }}
    />
  )
}
