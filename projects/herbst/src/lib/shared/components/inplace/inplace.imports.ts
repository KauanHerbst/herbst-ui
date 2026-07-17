import { HbInplaceCloserDirective } from './inplace-closer.directive';
import { HbInplaceContentDirective } from './inplace-content.directive';
import { HbInplaceDisplayDirective } from './inplace-display.directive';
import { HbInplaceComponent } from './inplace.component';

export const HbInplaceImports = [
  HbInplaceComponent,
  HbInplaceDisplayDirective,
  HbInplaceContentDirective,
  HbInplaceCloserDirective,
] as const;
