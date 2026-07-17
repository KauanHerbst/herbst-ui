import { HbSkeletonAvatarComponent } from './skeleton-avatar.component';
import { HbSkeletonButtonComponent } from './skeleton-button.component';
import { HbSkeletonCardComponent } from './skeleton-card.component';
import { HbSkeletonFormComponent } from './skeleton-form.component';
import { HbSkeletonInputComponent } from './skeleton-input.component';
import { HbSkeletonListComponent } from './skeleton-list.component';
import { HbSkeletonTableComponent } from './skeleton-table.component';
import { HbSkeletonTextComponent } from './skeleton-text.component';
import { HbSkeletonComponent } from './skeleton.component';

export const HbSkeletonImports = [
  HbSkeletonComponent,
  HbSkeletonTextComponent,
  HbSkeletonButtonComponent,
  HbSkeletonInputComponent,
  HbSkeletonAvatarComponent,
  HbSkeletonCardComponent,
  HbSkeletonListComponent,
  HbSkeletonFormComponent,
  HbSkeletonTableComponent,
] as const;
