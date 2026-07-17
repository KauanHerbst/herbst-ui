import { HbPopoverComponent } from './popover.component';
import { HbPopoverContentComponent } from './popover-content.component';
import { HbPopoverDescriptionComponent } from './popover-description.component';
import { HbPopoverHeaderComponent } from './popover-header.component';
import { HbPopoverTitleComponent } from './popover-title.component';
import { HbPopoverCloseDirective } from './popover-close.directive';
import { HbPopoverTriggerDirective } from './popover-trigger.directive';

export const HbPopoverImports = [
  HbPopoverComponent,
  HbPopoverTriggerDirective,
  HbPopoverContentComponent,
  HbPopoverHeaderComponent,
  HbPopoverTitleComponent,
  HbPopoverDescriptionComponent,
  HbPopoverCloseDirective,
] as const;
