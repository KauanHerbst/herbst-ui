import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  effect,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { NgIcon } from '@ng-icons/core';

import { cn, type ClassValue } from '../../utils';
import {
  avatarBadgeVariants,
  avatarFallbackVariants,
  avatarImageVariants,
  avatarStatusColors,
  avatarVariants,
  type HbAvatarBadgePosition,
  type HbAvatarShape,
  type HbAvatarSize,
  type HbAvatarStatus,
} from './avatar.variants';

@Directive({ selector: '[hbAvatarBadge]' })
export class HbAvatarBadgeDirective {}

@Component({
  selector: 'hb-avatar, [hb-avatar]',
  imports: [NgIcon],
  template: `
    @if (hbSrc() && !imageError()) {
      <img
        [src]="hbSrc()"
        [alt]="hbAlt()"
        [attr.loading]="hbPriority() ? 'eager' : 'lazy'"
        [attr.fetchpriority]="hbPriority() ? 'high' : null"
        [class]="imageClasses()"
        (error)="onImageError()"
        (load)="onImageLoad()"
      />
    } @else {
      <span [class]="fallbackClasses()">{{ hbFallback() }}</span>
    }

    @if (showBadge()) {
      <span [class]="badgeClasses()" [attr.aria-label]="hbStatus() ?? null" data-slot="avatar-badge">
        @if (hasCustomBadge()) {
          <ng-content select="[hbAvatarBadge]" />
        } @else if (hbBadgeIcon()) {
          <ng-icon [name]="hbBadgeIcon()" class="text-foreground [&>svg]:size-[70%]" />
        } @else {
          <span class="size-full rounded-full" [class]="statusColorClass()"></span>
        }
      </span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'containerClasses()',
    '[style.width.px]': 'customSize()',
    '[style.height.px]': 'customSize()',
    role: 'img',
    '[attr.aria-label]': 'hbAlt() || hbFallback() || null',
    '[attr.data-status]': 'hbStatus() ?? null',
    '[attr.data-disabled]': 'hbDisabled() ? "" : null',
    '(click)': 'onClick()',
  },
  exportAs: 'hbAvatar',
})
export class HbAvatarComponent {
  readonly hbSrc = input('');
  readonly hbAlt = input('');
  readonly hbFallback = input('');
  readonly hbPriority = input(false, { transform: booleanAttribute });
  readonly hbSize = input<HbAvatarSize | number>('md');
  readonly hbShape = input<HbAvatarShape>('circle');
  readonly hbStatus = input<HbAvatarStatus | undefined>(undefined);
  readonly hbBadgePosition = input<HbAvatarBadgePosition>('bottom-right');
  readonly hbBadgeIcon = input('');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly hbClick = output<void>();

  protected readonly imageError = signal(false);
  protected readonly imageLoaded = signal(false);

  private readonly customBadgeSlot = contentChild(HbAvatarBadgeDirective);
  protected readonly hasCustomBadge = computed(() => this.customBadgeSlot() != null);

  constructor() {
    effect(() => {
      this.hbSrc();
      this.imageError.set(false);
      this.imageLoaded.set(false);
    });
  }

  private readonly namedSize = computed<HbAvatarSize>(() => {
    const size = this.hbSize();
    return typeof size === 'number' ? 'md' : size;
  });

  protected readonly customSize = computed(() => {
    const size = this.hbSize();
    return typeof size === 'number' ? size : null;
  });

  protected readonly containerClasses = computed(() =>
    cn(
      avatarVariants({ size: this.namedSize(), shape: this.hbShape() }),
      this.hbDisabled() ? 'pointer-events-none opacity-50' : '',
      this.class(),
    ),
  );
  protected readonly imageClasses = computed(() => avatarImageVariants({ shape: this.hbShape() }));
  protected readonly fallbackClasses = computed(() => avatarFallbackVariants({ shape: this.hbShape() }));
  protected readonly badgeClasses = computed(() =>
    avatarBadgeVariants({ position: this.hbBadgePosition(), size: this.namedSize() }),
  );

  protected readonly statusColorClass = computed(() => {
    const status = this.hbStatus();
    return status ? avatarStatusColors[status] : '';
  });

  protected readonly showBadge = computed(
    () => this.hasCustomBadge() || !!this.hbBadgeIcon() || !!this.hbStatus(),
  );

  protected onImageLoad(): void {
    this.imageLoaded.set(true);
    this.imageError.set(false);
  }

  protected onImageError(): void {
    this.imageError.set(true);
    this.imageLoaded.set(false);
  }

  protected onClick(): void {
    this.hbClick.emit();
  }
}
