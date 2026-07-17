import { HbEmptyComponent } from './empty.component';
import { HbEmptyContentComponent } from './empty-content.component';
import { HbEmptyDescriptionComponent } from './empty-description.component';
import { HbEmptyHeaderComponent } from './empty-header.component';
import { HbEmptyMediaComponent } from './empty-media.component';
import { HbEmptyTitleComponent } from './empty-title.component';

export const HbEmptyImports = [
  HbEmptyComponent,
  HbEmptyHeaderComponent,
  HbEmptyMediaComponent,
  HbEmptyTitleComponent,
  HbEmptyDescriptionComponent,
  HbEmptyContentComponent,
] as const;
