import { HbMessageScrollerButtonComponent } from './message-scroller-button.component';
import { HbMessageScrollerContentComponent } from './message-scroller-content.component';
import { HbMessageScrollerItemComponent } from './message-scroller-item.component';
import { HbMessageScrollerViewportComponent } from './message-scroller-viewport.component';
import { HbMessageScrollerComponent } from './message-scroller.component';

export const HbMessageScrollerImports = [
  HbMessageScrollerComponent,
  HbMessageScrollerViewportComponent,
  HbMessageScrollerContentComponent,
  HbMessageScrollerItemComponent,
  HbMessageScrollerButtonComponent,
] as const;
