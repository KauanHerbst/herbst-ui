import { HbMessageActionsComponent } from './message-actions.component';
import { HbMessageAttachmentsComponent } from './message-attachments.component';
import { HbMessageAvatarComponent } from './message-avatar.component';
import { HbMessageContentComponent } from './message-content.component';
import { HbMessageFooterComponent } from './message-footer.component';
import { HbMessageGroupComponent } from './message-group.component';
import { HbMessageHeaderComponent } from './message-header.component';
import { HbMessageComponent } from './message.component';

export const HbMessageImports = [
  HbMessageComponent,
  HbMessageGroupComponent,
  HbMessageAvatarComponent,
  HbMessageContentComponent,
  HbMessageHeaderComponent,
  HbMessageFooterComponent,
  HbMessageActionsComponent,
  HbMessageAttachmentsComponent,
] as const;
