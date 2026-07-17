import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn } from '../../utils';
import { HbCommandItemComponent } from './command-item.component';
import { commandGroupHeadingVariants } from './command.variants';

@Component({
  selector: 'hb-command-group',
  template: `
    @if (hbHeading()) {
      <div [class]="headingClasses" data-slot="command-group-heading">{{ hbHeading() }}</div>
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'group',
    class: 'block',
    '[style.display]': "visible() ? null : 'none'",
    '[attr.data-slot]': "'command-group'",
  },
  exportAs: 'hbCommandGroup',
})
export class HbCommandGroupComponent {
  readonly hbHeading = input('');
  private readonly groupItems = contentChildren(HbCommandItemComponent, { descendants: true });
  protected readonly headingClasses = cn(commandGroupHeadingVariants());
  protected readonly visible = computed(() => {
    const items = this.groupItems();
    return items.length === 0 || items.some((i) => i.matches());
  });
}
