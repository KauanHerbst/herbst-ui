import { Directive } from '@angular/core';

@Directive({
  selector: '[hbPopoverTrigger]',
  host: { '[attr.data-slot]': "'popover-trigger'" },
  exportAs: 'hbPopoverTrigger',
})
export class HbPopoverTriggerDirective {}
