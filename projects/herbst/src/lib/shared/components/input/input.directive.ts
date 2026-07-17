import { booleanAttribute, computed, Directive, ElementRef, inject, input } from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { inputVariants, type HbInputSize, type HbInputStatus } from './input.variants';

@Directive({
  selector: 'input[hb-input], textarea[hb-input]',
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'input'",
    '[attr.aria-invalid]': 'hbInvalid() || null',
    '[attr.data-status]': "hbStatus() !== 'default' ? hbStatus() : null",
  },
  exportAs: 'hbInput',
})
export class HbInputDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly baseClass = this.host.nativeElement.getAttribute('class') ?? '';
  private readonly isTextarea = this.host.nativeElement.tagName === 'TEXTAREA';
  private readonly isFile =
    this.host.nativeElement.tagName === 'INPUT' &&
    this.host.nativeElement.getAttribute('type') === 'file';

  readonly hbSize = input<HbInputSize>('md');
  readonly hbStatus = input<HbInputStatus>('default');
  readonly hbInvalid = input(false, { transform: booleanAttribute });
  readonly hbBorderless = input(false, { transform: booleanAttribute });
  readonly hbRing = input(true, { transform: booleanAttribute });
  readonly hbFluid = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      inputVariants({
        size: this.hbSize(),
        status: this.hbStatus(),
        borderless: this.hbBorderless(),
        ring: this.hbRing(),
        fluid: this.hbFluid(),
      }),
      this.isTextarea ? 'field-sizing-content h-auto min-h-16 py-2' : '',
      this.isFile ? 'flex items-center cursor-pointer file:cursor-pointer' : '',
      this.baseClass,
      this.class(),
    ),
  );
}
