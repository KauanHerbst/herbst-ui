import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorDotsSixVertical } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HB_RESIZABLE_GROUP } from './resizable.token';
import { resizableGripVariants, resizableHandleVariants } from './resizable.variants';

@Component({
  selector: 'hb-resizable-handle, [hb-resizable-handle]',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorDotsSixVertical })],
  template: `
    @if (hbWithHandle()) {
      <div [class]="gripClasses()"><ng-icon name="phosphorDotsSixVertical" /></div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    role: 'separator',
    '[class]': 'classes()',
    '[attr.data-slot]': "'resizable-handle'",
    '[attr.data-orientation]': 'orientation()',
    '[attr.aria-orientation]': 'orientation() === "vertical" ? "horizontal" : "vertical"',
    '[attr.tabindex]': 'hbDisabled() ? null : 0',
    '[attr.aria-disabled]': 'hbDisabled() || null',
    '(pointerdown)': 'onPointerDown($event)',
    '(keydown)': 'onKeydown($event)',
  },
  exportAs: 'hbResizableHandle',
})
export class HbResizableHandleComponent {
  readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly group = inject(HB_RESIZABLE_GROUP, { optional: true });

  readonly hbWithHandle = input(false, { transform: booleanAttribute });
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  protected readonly orientation = computed(() => this.group?.hbOrientation() ?? 'horizontal');
  protected readonly classes = computed(() =>
    cn(
      resizableHandleVariants({ orientation: this.orientation(), disabled: this.hbDisabled() }),
      this.class(),
    ),
  );
  protected readonly gripClasses = computed(() =>
    resizableGripVariants({ orientation: this.orientation() }),
  );

  onPointerDown(event: PointerEvent): void {
    if (this.hbDisabled() || !this.group) return;
    event.preventDefault();
    this.group.startResize(this.group.handleIndexOf(this), event);
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.hbDisabled() || !this.group) return;
    const index = this.group.handleIndexOf(this);
    const horizontal = this.orientation() === 'horizontal';
    const decKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
    const incKey = horizontal ? 'ArrowRight' : 'ArrowDown';
    let handled = true;
    switch (event.key) {
      case decKey:
        this.group.resizeByKeyboard(index, -1);
        break;
      case incKey:
        this.group.resizeByKeyboard(index, 1);
        break;
      case 'Home':
        this.group.resizeByKeyboard(index, 0, 'min');
        break;
      case 'End':
        this.group.resizeByKeyboard(index, 0, 'max');
        break;
      default:
        handled = false;
    }
    if (handled) event.preventDefault();
  }
}
