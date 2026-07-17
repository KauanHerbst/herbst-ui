import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

export const INPUT_OTP_DIGITS = /[0-9]/;
export const INPUT_OTP_CHARS = /[a-zA-Z]/;
export const INPUT_OTP_DIGITS_AND_CHARS = /[a-zA-Z0-9]/;

export type HbInputOtpPatternPreset = 'digits' | 'chars' | 'alphanumeric';
export type HbInputOtpPattern = HbInputOtpPatternPreset | RegExp;

export const inputOtpSlotVariants = cva(
  cn(
    'pointer-events-none relative flex items-center justify-center border-y border-r border-input text-foreground shadow-xs transition-all outline-none',
    'first:rounded-l-md first:border-l last:rounded-r-md',
    'data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50',
    'data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50',
  ),
  {
    variants: {
      size: {
        xs: 'size-7 text-xs',
        sm: 'size-8 text-sm',
        md: 'size-9 text-sm',
        lg: 'size-10 text-base',
        xl: 'size-11 text-lg',
      },
      status: {
        default: '',
        success:
          'data-[active=true]:border-success data-[active=true]:ring-success/30',
        warning:
          'data-[active=true]:border-warning data-[active=true]:ring-warning/30',
        error:
          'border-destructive data-[active=true]:border-destructive data-[active=true]:ring-destructive/30',
      },
      ring: {
        true: '',
        false: 'data-[active=true]:ring-0',
      },
    },
    defaultVariants: { size: 'md', status: 'default', ring: true },
  },
);

export type HbInputOtpSize = NonNullable<VariantProps<typeof inputOtpSlotVariants>['size']>;
export type HbInputOtpStatus = NonNullable<VariantProps<typeof inputOtpSlotVariants>['status']>;
