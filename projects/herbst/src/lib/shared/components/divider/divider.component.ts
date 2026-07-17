import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  dividerVariants,
  type HbDividerOrientation,
  type HbDividerVariant,
} from './divider.variants';

@Component({
  selector: 'hb-divider, [hb-divider]',
  template: `
    @if (hasLabel()) {
      <span class="shrink-0 px-3 text-xs text-muted-foreground">
        @if (hbLabel()) {
          {{ hbLabel() }}
        } @else {
          <ng-content />
        }
      </span>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    role: 'separator',
    '[attr.aria-orientation]': 'hbOrientation()',
    '[attr.data-slot]': "'divider'",
  },
  exportAs: 'hbDivider',
})
export class HbDividerComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly hbOrientation = input<HbDividerOrientation>('horizontal');
  readonly hbVariant = input<HbDividerVariant>('solid');
  readonly hbLabel = input('');
  readonly class = input<ClassValue>('');

  private readonly projectedLabel = signal(false);
  protected readonly hasLabel = computed(() => !!this.hbLabel() || this.projectedLabel());

  protected readonly classes = computed(() =>
    cn(
      dividerVariants({
        orientation: this.hbOrientation(),
        variant: this.hbVariant(),
        labeled: this.hasLabel(),
      }),
      this.class(),
    ),
  );

  constructor() {
    const read = (): boolean => (this.host.nativeElement.textContent ?? '').trim().length > 0;
    this.projectedLabel.set(read());
    afterNextRender(() => this.projectedLabel.set(read()));
  }
}
