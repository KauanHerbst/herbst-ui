import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorX } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { chipVariants, type HbChipSize, type HbChipType } from './chip.variants';

@Component({
  selector: 'hb-chip, [hb-chip]',
  imports: [NgIcon],
  template: `
    @if (hbImage() && !imageError()) {
      <img
        [src]="hbImage()"
        [alt]="hbImageAlt()"
        class="-ml-1 size-[1.4em] shrink-0 rounded-full object-cover"
        (error)="imageError.set(true)"
      />
    } @else if (hbIcon()) {
      <ng-icon [name]="hbIcon()" class="-ml-0.5 shrink-0" />
    }

    <ng-content />

    @if (hbRemovable()) {
      <button
        type="button"
        [class]="removeClasses"
        aria-label="Remove"
        [disabled]="hbDisabled()"
        (click)="onRemove($event)"
      >
        <ng-icon [name]="hbRemoveIcon() || 'phosphorX'" />
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ phosphorX })],
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'chip'",
    '[attr.data-disabled]': 'hbDisabled() ? "" : null',
  },
  exportAs: 'hbChip',
})
export class HbChipComponent {
  readonly hbIcon = input('');
  readonly hbImage = input('');
  readonly hbImageAlt = input('');
  readonly hbRemovable = input(false, { transform: booleanAttribute });
  readonly hbRemoveIcon = input('');
  readonly hbType = input<HbChipType>('secondary');
  readonly hbSize = input<HbChipSize>('md');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly hbRemove = output<void>();

  protected readonly imageError = signal(false);

  constructor() {
    effect(() => {
      this.hbImage();
      this.imageError.set(false);
    });
  }

  protected readonly classes = computed(() =>
    cn(
      chipVariants({ type: this.hbType(), size: this.hbSize() }),
      this.hbDisabled() ? 'pointer-events-none opacity-50' : '',
      this.class(),
    ),
  );

  protected readonly removeClasses = cn(
    '-mr-1 ml-0.5 inline-flex shrink-0 items-center justify-center rounded-full',
    'opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none',
    '[&>ng-icon>svg]:size-[0.9em]',
  );

  protected onRemove(event: Event): void {
    event.stopPropagation();
    this.hbRemove.emit();
  }
}
