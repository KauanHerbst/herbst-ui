import { cva, type VariantProps } from 'class-variance-authority';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 font-display text-4xl font-semibold tracking-tight text-balance',
      h2: 'scroll-m-20 border-b border-border pb-2 font-display text-3xl font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 font-display text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 font-display text-xl font-semibold tracking-tight',
      p: 'leading-7 [&:not(:first-child)]:mt-6',
      blockquote: 'mt-6 border-l-2 border-border pl-6 italic',
      list: 'my-6 ml-6 list-disc [&>li]:mt-2',
      'inline-code':
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg font-semibold',
      small: 'text-sm leading-none font-medium',
      muted: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: { variant: 'p' },
});

export type HbTypographyVariant = NonNullable<VariantProps<typeof typographyVariants>['variant']>;
export type HbTypographyColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'destructive'
  | 'success'
  | 'warning';
export type HbTypographyAlign = 'left' | 'center' | 'right' | 'justify';
export type HbTypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export const TYPOGRAPHY_COLOR: Record<HbTypographyColor, string> = {
  default: '',
  muted: 'text-muted-foreground',
  primary: 'text-primary',
  destructive: 'text-destructive',
  success: 'text-success',
  warning: 'text-warning',
};

export const TYPOGRAPHY_ALIGN: Record<HbTypographyAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
};

export const TYPOGRAPHY_WEIGHT: Record<HbTypographyWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};
