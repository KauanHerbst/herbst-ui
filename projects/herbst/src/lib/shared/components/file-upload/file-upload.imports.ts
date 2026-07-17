import { HbFileUploadComponent } from './file-upload.component';
import { HbUploadEmptyDirective } from './upload-empty.directive';
import { HbUploadFileDirective } from './upload-file.directive';
import { HbUploadHeaderDirective } from './upload-header.directive';

export const HbFileUploadImports = [
  HbFileUploadComponent,
  HbUploadHeaderDirective,
  HbUploadFileDirective,
  HbUploadEmptyDirective,
] as const;
