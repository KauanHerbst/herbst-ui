import { HbCommandComponent } from './command.component';
import { HbCommandDialogComponent } from './command-dialog.component';
import { HbCommandEmptyComponent } from './command-empty.component';
import { HbCommandFooterComponent } from './command-footer.component';
import { HbCommandGroupComponent } from './command-group.component';
import { HbCommandInputComponent } from './command-input.component';
import { HbCommandItemComponent } from './command-item.component';
import { HbCommandListComponent } from './command-list.component';
import { HbCommandSeparatorComponent } from './command-separator.component';
import { HbCommandShortcutComponent } from './command-shortcut.component';

export const HbCommandImports = [
  HbCommandComponent,
  HbCommandInputComponent,
  HbCommandListComponent,
  HbCommandEmptyComponent,
  HbCommandGroupComponent,
  HbCommandItemComponent,
  HbCommandSeparatorComponent,
  HbCommandShortcutComponent,
  HbCommandFooterComponent,
  HbCommandDialogComponent,
] as const;
