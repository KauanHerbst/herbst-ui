import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'hb-segmented-item',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[style.display]': "'none'" },
  exportAs: 'hbSegmentedItem',
})
export class HbSegmentedItemComponent {
  readonly value = input.required<string>();
  readonly label = input<string>('');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbIcon = input<string>('');
}
