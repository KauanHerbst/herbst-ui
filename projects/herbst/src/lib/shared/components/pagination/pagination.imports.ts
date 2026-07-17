import {
  HbPaginationComponent,
  HbPaginationEllipsisTemplateDirective,
  HbPaginationNextTemplateDirective,
  HbPaginationPageTemplateDirective,
  HbPaginationPreviousTemplateDirective,
} from './pagination.component';

export const HbPaginationImports = [
  HbPaginationComponent,
  HbPaginationPageTemplateDirective,
  HbPaginationEllipsisTemplateDirective,
  HbPaginationPreviousTemplateDirective,
  HbPaginationNextTemplateDirective,
] as const;
