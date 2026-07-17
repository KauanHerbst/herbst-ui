import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import {
  attachmentGroupVariants,
  type HbAttachmentGroupOrientation,
} from './attachment-group.variants';

@Component({
  selector: 'hb-attachment-group',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    role: 'group',
  },
  exportAs: 'hbAttachmentGroup',
})
export class HbAttachmentGroupComponent {
  readonly hbOrientation = input<HbAttachmentGroupOrientation>('horizontal');
  readonly class = input<ClassValue>('');

  protected readonly classes = computed(() =>
    cn(attachmentGroupVariants({ orientation: this.hbOrientation() }), this.class()),
  );
}
