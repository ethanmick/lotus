'use client'

import { AriaButtonProps, useButton } from '@react-aria/button'
import type { VariantProps } from 'cva'
import { cva } from 'cva'
import { motion, useAnimationControls } from 'framer-motion'
import React, { useRef } from 'react'

export type ButtonProps = VariantProps<typeof button>
const button = cva(
  [
    // Base styles
    'relative inline-flex cursor-pointer items-center justify-center outline-none rounded-full',
    // Spacing
    'py-2 px-12 leading-6',
    // Font
    'font-semibold tracking-wide',
    // Ring
    'ring-primary-500/70 ring-offset-2 focus-visible:ring-2',
    // Animation
    'transition-colors',
    // Disabled
    'disabled:bg-primary-500/50 disabled:cursor-not-allowed'
  ],
  {
    variants: {
      variant: {
        primary: ['bg-primary-500 hover:bg-primary-600 text-white']
      },
      size: {
        small: [],
        base: ['min-h-[40px] min-w-[80px]']
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'base'
    }
  }
)

const loadingClasses = cva(['transition'], {
  variants: {
    loading: {
      true: 'opacity-0',
      false: 'opacity-100'
    }
  }
})
const Loading = () => {
  return (
    <div className="absolute inline-flex items-center">
      <svg
        className="fill-white"
        width="60"
        height="20"
        viewBox="0 0 60 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="7" cy="16" r="4"></circle>
        <circle cx="30" cy="16" r="4"></circle>
        <circle cx="53" cy="16" r="4"></circle>
      </svg>
      {/* <style jsx>{`
        circle {
          animation-duration: 1.5s;
          animation-iteration-count: infinite;
          animation-name: loading-animation;
          animation-timing-function: cubic-bezier(0.05, 0.2, 0.35, 1);
        }

        circle:nth-child(2) {
          animation-delay: 0.1s;
        }

        circle:nth-child(3) {
          animation-delay: 0.2s;
        }

        @keyframes loading-animation {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          25% {
            opacity: 1;
            transform: translateY(-6px);
          }
          75% {
            opacity: 1;
            transform: translateY(-6px);
          }
          100% {
            opacity: 0;
            transform: translateY(0);
          }
        }
      `}</style> */}
    </div>
  )
}

type Props = AriaButtonProps<'button'> & {
  className?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  loading?: boolean
}

export const Button: React.FC = (props: Props) => {
  const { children, loading, isDisabled, variant, className } = props
  const ref = useRef<HTMLButtonElement>(null)
  const controls = useAnimationControls()
  const { buttonProps } = useButton(
    {
      ...props,
      isDisabled: props.isDisabled || props.loading,
      onPressStart: () => {
        controls.stop()
        controls.start({
          scale: 0.98,
          transition: { duration: 0.2 }
        })
      },
      onPressEnd: () => {
        controls.start({
          scale: 1.0,
          transition: { duration: 0.3 }
        })
      }
    },
    ref
  )

  return (
    <motion.button
      animate={controls}
      ref={ref}
      className={button({ variant, className })}
      disabled={isDisabled || loading}
      {...(buttonProps as any)}
    >
      {loading && <Loading />}
      <div className={loadingClasses({ loading })}>{children}</div>
    </motion.button>
  )
}
