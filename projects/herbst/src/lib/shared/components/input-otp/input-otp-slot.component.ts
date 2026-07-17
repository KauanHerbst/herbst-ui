import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  numberAttribute,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbInputOtpComponent } from './input-otp.component';
import { inputOtpSlotVariants } from './input-otp.variants';

@Component({
  selector: 'hb-input-otp-slot',
  template: `
    @if (char()) {
      <span>{{ char() }}</span>
    } @else if (caret()) {
      <span class="hb-input-otp-caret" aria-hidden="true"></span>
    }
  `,
  styles: `
    .hb-input-otp-caret {
      display: block;
      width: 1px;
      height: 1rem;
      background: var(--foreground);
      animation: hb-input-otp-caret-blink 1s steps(1) infinite;
    }
    @keyframes hb-input-otp-caret-blink {
      0%,
      50% {
        opacity: 1;
      }
      50.01%,
      100% {
        opacity: 0;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    'aria-hidden': 'true',
    '[attr.data-slot]': "'input-otp-slot'",
    '[attr.data-active]': 'active() || null',
    '[attr.data-status]': 'otp.status()',
    '[attr.data-disabled]': 'otp.isDisabled() || null',
  },
  exportAs: 'hbInputOtpSlot',
})
export class HbInputOtpSlotComponent {
  protected readonly otp = inject(HbInputOtpComponent);

  readonly hbIndex = input.required<number, unknown>({ transform: numberAttribute });
  readonly class = input<ClassValue>('');

  protected readonly char = computed(() => this.otp.charAt(this.hbIndex()));
  protected readonly active = computed(() => this.otp.isActive(this.hbIndex()));
  protected readonly caret = computed(() => this.otp.showCaret(this.hbIndex()));
  protected readonly classes = computed(() =>
    cn(
      inputOtpSlotVariants({
        size: this.otp.size(),
        status: this.otp.status(),
        ring: this.otp.ring(),
      }),
      this.class(),
    ),
  );
}
