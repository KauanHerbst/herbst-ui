import { Directive } from '@angular/core';

@Directive({
  selector: '[hbHoverCardTrigger]',
  host: { '[attr.data-slot]': "'hover-card-trigger'" },
  exportAs: 'hbHoverCardTrigger',
})
export class HbHoverCardTriggerDirective {}
