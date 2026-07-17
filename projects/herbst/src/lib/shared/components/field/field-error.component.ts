import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { fieldErrorVariants } from './field.variants';

@Component({
  selector: 'hb-field-error, [hb-field-error]',
  template: `
    @if (hbErrors().length) {
      @if (hbErrors().length === 1) {
        {{ hbErrors()[0] }}
      } @else {
        <ul class="ml-4 flex list-disc flex-col gap-0.5">
          @for (error of hbErrors(); track error) {
            <li>{{ error }}</li>
          }
        </ul>
      }
    } @else {
      <ng-content />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'classes()', role: 'alert', '[attr.data-slot]': "'field-error'" },
  exportAs: 'hbFieldError',
})
export class HbFieldErrorComponent {
  readonly hbErrors = input<string[]>([]);
  readonly class = input<ClassValue>('');
  protected readonly classes = computed(() => cn(fieldErrorVariants(), this.class()));
}
