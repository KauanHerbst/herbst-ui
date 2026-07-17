import { HbFieldComponent } from './field.component';
import { HbFieldContentComponent } from './field-content.component';
import { HbFieldDescriptionComponent } from './field-description.component';
import { HbFieldErrorComponent } from './field-error.component';
import { HbFieldGroupComponent } from './field-group.component';
import { HbFieldLabelComponent } from './field-label.component';
import { HbFieldLegendComponent } from './field-legend.component';
import { HbFieldSeparatorComponent } from './field-separator.component';
import { HbFieldSetComponent } from './field-set.component';
import { HbFieldTitleComponent } from './field-title.component';

export const HbFieldImports = [
  HbFieldComponent,
  HbFieldLabelComponent,
  HbFieldTitleComponent,
  HbFieldDescriptionComponent,
  HbFieldErrorComponent,
  HbFieldContentComponent,
  HbFieldGroupComponent,
  HbFieldSetComponent,
  HbFieldLegendComponent,
  HbFieldSeparatorComponent,
] as const;
