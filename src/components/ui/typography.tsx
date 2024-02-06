import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const typographyVariants = cva('', {
  variants: {
    variant: {
      normal: 'text-base mb-[20px]',
      major: 'text-xl mb-[20px]',
      legal: 'text-xs italic mb-[14px]',
      small: 'text-xs mb-[14px]',
    },
    shade: {
      muted: 'text-gray-60',
      default: '',
    },
  },
  defaultVariants: {
    variant: 'normal',
    shade: 'default',
  },
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean
}

const Typography = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, variant, shade, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'p'
    return (
      <Comp
        ref={ref}
        className={cn(typographyVariants({ variant, shade, className }))}
        {...props}
      />
    )
  }
)

export { Typography, typographyVariants }
