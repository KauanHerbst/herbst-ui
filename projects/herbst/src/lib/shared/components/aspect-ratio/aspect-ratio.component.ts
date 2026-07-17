import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';

@Component({
  selector: 'hb-aspect-ratio, [hb-aspect-ratio]',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[style.aspectRatio]': 'hbRatio()',
    '[attr.data-slot]': "'aspect-ratio'",
  },
  exportAs: 'hbAspectRatio',
})
export class HbAspectRatioComponent {
  readonly hbRatio = input<number>(1);
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(
      'relative block w-full overflow-hidden [&>*]:size-full [&>img]:object-cover [&>video]:object-cover',
      this.class(),
    ),
  );
}
