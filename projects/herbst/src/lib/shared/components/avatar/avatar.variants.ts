import { cva, type VariantProps } from 'class-variance-authority';

export const avatarVariants = cva('relative inline-flex shrink-0 select-none', {
  variants: {
    size: {
      xs: 'size-6 text-[0.625rem]',
      sm: 'size-8 text-xs',
      md: 'size-10 text-sm',
      lg: 'size-14 text-lg',
      xl: 'size-20 text-2xl',
    },
    shape: {
      circle: 'rounded-full',
      square: 'rounded-md',
    },
  },
  defaultVariants: { size: 'md', shape: 'circle' },
});

export const avatarImageVariants = cva('size-full object-cover', {
  variants: { shape: { circle: 'rounded-full', square: 'rounded-md' } },
  defaultVariants: { shape: 'circle' },
});

export const avatarFallbackVariants = cva(
  'flex size-full items-center justify-center bg-muted font-medium text-muted-foreground uppercase',
  {
    variants: { shape: { circle: 'rounded-full', square: 'rounded-md' } },
    defaultVariants: { shape: 'circle' },
  },
);

export const avatarBadgeVariants = cva(
  'absolute z-10 flex items-center justify-center rounded-full bg-background ring-2 ring-background',
  {
    variants: {
      position: {
        'top-right': 'top-[6%] right-[6%]',
        'top-left': 'top-[6%] left-[6%]',
        'bottom-right': 'right-[6%] bottom-[6%]',
        'bottom-left': 'bottom-[6%] left-[6%]',
      },
      size: {
        xs: 'size-2',
        sm: 'size-2.5',
        md: 'size-3',
        lg: 'size-3.5',
        xl: 'size-4',
      },
    },
    defaultVariants: { position: 'bottom-right', size: 'md' },
  },
);

export const avatarStatusColors: Record<HbAvatarStatus, string> = {
  online: 'bg-success',
  offline: 'bg-muted-foreground',
  away: 'bg-warning',
  busy: 'bg-destructive',
};

export type HbAvatarSize = NonNullable<VariantProps<typeof avatarVariants>['size']>;
export type HbAvatarShape = NonNullable<VariantProps<typeof avatarVariants>['shape']>;
export type HbAvatarStatus = 'online' | 'offline' | 'away' | 'busy';
export type HbAvatarBadgePosition = NonNullable<VariantProps<typeof avatarBadgeVariants>['position']>;
