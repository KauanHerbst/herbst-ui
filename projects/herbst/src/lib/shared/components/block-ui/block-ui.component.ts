import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorSpinnerGap } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { blockUiOverlayVariants } from './block-ui.variants';

@Component({
  selector: 'hb-block-ui, [hb-block-ui]',
  imports: [NgIcon],
  template: `
    <div [inert]="hbBlocked()" [attr.aria-busy]="hbBlocked() || null">
      <ng-content />
    </div>

    @if (hbBlocked()) {
      <div [class]="overlayClasses()" role="status" aria-live="polite" data-slot="block-ui-overlay">
        <ng-content select="[hbBlockUiContent]" />
        @if (hbSpinner()) {
          <ng-icon
            name="phosphorSpinnerGap"
            class="animate-spin text-muted-foreground [&>svg]:size-6"
          />
        } @else if (hbIcon()) {
          <ng-icon [name]="hbIcon()" class="text-muted-foreground [&>svg]:size-6" />
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ phosphorSpinnerGap })],
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'block-ui'",
    '[attr.data-blocked]': 'hbBlocked() ? "" : null',
  },
  exportAs: 'hbBlockUi',
})
export class HbBlockUiComponent {
  readonly hbBlocked = input(false, { transform: booleanAttribute });
  readonly hbFullScreen = input(false, { transform: booleanAttribute });
  readonly hbSpinner = input(false, { transform: booleanAttribute });
  readonly hbIcon = input('');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() => cn('relative block', this.class()));
  protected readonly overlayClasses = computed(() =>
    blockUiOverlayVariants({ fullScreen: this.hbFullScreen() }),
  );
}
