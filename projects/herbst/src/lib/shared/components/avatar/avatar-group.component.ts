import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';

import { NgIcon } from '@ng-icons/core';

import { HbMenuImports } from '../menu';

import { cn, type ClassValue } from '../../utils';
import { HbAvatarComponent } from './avatar.component';
import { avatarGroupChipVariants, avatarGroupVariants } from './avatar-group.variants';
import type { HbAvatarShape, HbAvatarSize } from './avatar.variants';

@Component({
  selector: 'hb-avatar-group',
  imports: [NgIcon, HbMenuImports],
  template: `
    <ng-content />

    @if (overflowCount() > 0) {
      <span
        class="inline-flex"
        [hbMenuTriggerFor]="overflowMenu"
        #overflowTrigger="hbMenuTrigger"
      >
        <div
          [class]="chipClasses()"
          [style.width.px]="customSize()"
          [style.height.px]="customSize()"
          role="button"
          tabindex="0"
          data-slot="avatar-group-overflow"
          (click)="hbOverflowClick.emit(); overflowTrigger.toggle()"
        >
          @if (hbOverflowIcon()) {
            <ng-icon [name]="hbOverflowIcon()" class="[&>svg]:size-[45%]" />
          } @else {
            +{{ overflowCount() }}
          }
        </div>
      </span>
    }

    <ng-template #overflowMenu>
      <hb-menu class="min-w-44">
        @for (avatar of hiddenAvatars(); track $index) {
          <button hb-menu-item type="button">{{ avatarLabel(avatar) }}</button>
        }
      </hb-menu>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'groupClasses()',
    role: 'group',
  },
  exportAs: 'hbAvatarGroup',
})
export class HbAvatarGroupComponent {
  readonly hbOrientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly hbMax = input<number | null>(null);
  readonly hbOverflowIcon = input('');
  readonly hbSpacing = input<'sm' | 'md' | 'lg'>('md');
  readonly hbSize = input<HbAvatarSize | number>('md');
  readonly hbShape = input<HbAvatarShape>('circle');
  readonly class = input<ClassValue>('');

  readonly hbOverflowClick = output<void>();

  private readonly avatars = contentChildren(HbAvatarComponent, { read: ElementRef });
  private readonly avatarComponents = contentChildren(HbAvatarComponent);

  protected readonly hiddenAvatars = computed(() => {
    const max = this.hbMax();
    if (max == null || max <= 0) return [];
    return this.avatarComponents().slice(max);
  });
  protected avatarLabel(avatar: HbAvatarComponent): string {
    return avatar.hbAlt() || avatar.hbFallback() || '—';
  }

  protected readonly total = computed(() => this.avatars().length);

  protected readonly overflowCount = computed(() => {
    const max = this.hbMax();
    if (max == null || max <= 0) return 0;
    return Math.max(0, this.total() - max);
  });

  private readonly namedSize = computed<HbAvatarSize>(() => {
    const size = this.hbSize();
    return typeof size === 'number' ? 'md' : size;
  });

  protected readonly customSize = computed(() => {
    const size = this.hbSize();
    return typeof size === 'number' ? size : null;
  });

  protected readonly groupClasses = computed(() =>
    cn(
      avatarGroupVariants({ orientation: this.hbOrientation(), spacing: this.hbSpacing() }),
      this.class(),
    ),
  );

  protected readonly chipClasses = computed(() =>
    avatarGroupChipVariants({ size: this.namedSize(), shape: this.hbShape() }),
  );

  constructor() {
    effect(() => {
      const max = this.hbMax();
      this.avatars().forEach((ref, index) => {
        const el = ref.nativeElement as HTMLElement;
        el.style.display = max != null && max > 0 && index >= max ? 'none' : '';
      });
    });
  }
}
