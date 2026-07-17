import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorPlus } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { type HbBubbleReaction } from './bubble.variants';

@Component({
  selector: 'hb-bubble-reactions',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorPlus })],
  template: `
    @for (r of hbReactions(); track r.emoji) {
      <button type="button" [class]="chipClasses(r)" (click)="hbReact.emit(r.emoji)">
        <span>{{ r.emoji }}</span>
        @if (r.count) {
          <span class="tabular-nums">{{ r.count }}</span>
        }
      </button>
    }
    @if (hbAddable()) {
      <button
        type="button"
        class="inline-flex h-6 items-center justify-center rounded-full border border-border px-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Add reaction"
        (click)="hbAdd.emit()"
      >
        <ng-icon name="phosphorPlus" />
      </button>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', '[attr.data-slot]': "'bubble-reactions'" },
  exportAs: 'hbBubbleReactions',
})
export class HbBubbleReactionsComponent {
  readonly hbReactions = input<HbBubbleReaction[]>([]);
  readonly hbAddable = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly hbReact = output<string>();
  readonly hbAdd = output<void>();

  protected readonly classes = computed(() =>
    cn('mt-2 flex flex-wrap items-center gap-1', this.class()),
  );
  protected chipClasses(r: HbBubbleReaction): string {
    return cn(
      'inline-flex h-6 items-center gap-1 rounded-full border px-1.5 text-xs transition-colors',
      r.reacted
        ? 'border-primary/40 bg-primary/10 text-foreground'
        : 'border-border bg-background text-muted-foreground hover:bg-muted',
    );
  }
}
