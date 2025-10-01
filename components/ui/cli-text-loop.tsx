'use client'
import { cn } from '@/lib/utils'
import { useState, useEffect, Children } from 'react'

export type CliTextLoopProps = {
  children: React.ReactNode[]
  className?: string
  interval?: number
  typingSpeed?: number
  onIndexChange?: (index: number) => void
  trigger?: boolean
  prompt?: string
}

type AnimationState = 'typing-command' | 'showing-content' | 'waiting'

export function CliTextLoop({
  children,
  className,
  interval = 4,
  typingSpeed = 80,
  onIndexChange,
  trigger = true,
  prompt = '$',
}: CliTextLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [typedCommand, setTypedCommand] = useState('')
  const [animationState, setAnimationState] =
    useState<AnimationState>('typing-command')
  const [showCursor, setShowCursor] = useState(true)
  const items = Children.toArray(children)

  const getCommandForIndex = (index: number) => {
    switch (index) {
      case 0:
        return 'cat copyright.txt'
      case 1:
        return 'echo $CREATED_WITH'
      case 2:
        return 'cat builton.yaml'
      default:
        return `cat message-${index + 1}.txt`
    }
  }

  const currentCommand = getCommandForIndex(currentIndex)

  // Main interval to switch between items
  useEffect(() => {
    if (!trigger) return

    const intervalMs = interval * 1000
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        const next = (current + 1) % items.length
        onIndexChange?.(next)
        return next
      })
    }, intervalMs)
    return () => clearInterval(timer)
  }, [items.length, interval, onIndexChange, trigger])

  // Animation logic
  useEffect(() => {
    if (!trigger) return

    let timeout: NodeJS.Timeout

    if (animationState === 'typing-command') {
      if (typedCommand.length < currentCommand.length) {
        // Type next character
        timeout = setTimeout(
          () => {
            setTypedCommand(currentCommand.slice(0, typedCommand.length + 1))
          },
          typingSpeed + Math.random() * 40 - 20,
        ) // Variable speed
      } else {
        // Command fully typed, show content
        timeout = setTimeout(() => {
          setAnimationState('showing-content')
        }, 300)
      }
    } else if (animationState === 'showing-content') {
      // Content shown, wait before next cycle
      timeout = setTimeout(() => {
        setAnimationState('waiting')
      }, 3500)
    } else if (animationState === 'waiting') {
      // Short wait before clearing
      timeout = setTimeout(() => {
        setAnimationState('typing-command')
      }, 500)
    }

    return () => clearTimeout(timeout)
  }, [animationState, typedCommand, currentCommand, typingSpeed, trigger])

  // Reset when index changes
  useEffect(() => {
    setTypedCommand('')
    setAnimationState('typing-command')
  }, [currentIndex])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className={cn('relative font-mono', className)}>
      <div className="flex items-start pl-8 sm:pl-0">
        <span className="mr-1 shrink-0 text-green-600 dark:text-green-400">
          {prompt}$
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <span className="text-zinc-800 dark:text-white">{typedCommand}</span>
          {animationState === 'typing-command' && showCursor && (
            <span className="animate-pulse">|</span>
          )}
        </div>
      </div>
      <div className="mt-1 min-h-[2rem] pl-8 sm:min-h-[1.5rem] sm:pl-0">
        {(animationState === 'showing-content' ||
          animationState === 'waiting') && <div>{items[currentIndex]}</div>}
      </div>
    </div>
  )
}
