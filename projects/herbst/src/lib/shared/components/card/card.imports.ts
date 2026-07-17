import { HbCardActionDirective, HbCardComponent } from './card.component';
import { HbCardContentComponent } from './card-content.component';
import { HbCardDescriptionComponent } from './card-description.component';
import { HbCardFooterComponent } from './card-footer.component';
import { HbCardHeaderComponent } from './card-header.component';
import { HbCardImageComponent } from './card-image.component';
import { HbCardTitleComponent } from './card-title.component';

export const HbCardImports = [
  HbCardComponent,
  HbCardHeaderComponent,
  HbCardTitleComponent,
  HbCardDescriptionComponent,
  HbCardActionDirective,
  HbCardContentComponent,
  HbCardFooterComponent,
  HbCardImageComponent,
] as const;
