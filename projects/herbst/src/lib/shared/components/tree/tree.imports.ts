import { HbTreeNodeContentDirective } from './tree-node-content.directive';
import { HbTreeToggleDirective } from './tree-toggle.directive';
import { HbTreeComponent } from './tree.component';

export const HbTreeImports = [
  HbTreeComponent,
  HbTreeToggleDirective,
  HbTreeNodeContentDirective,
] as const;
