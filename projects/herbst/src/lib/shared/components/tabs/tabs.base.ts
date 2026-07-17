import {
  booleanAttribute,
  computed,
  contentChild,
  Directive,
  input,
  model,
  numberAttribute,
  output,
  signal,
  TemplateRef,
} from '@angular/core';

import { type ClassValue } from '../../utils';
import { HbTabsIndicatorDirective } from './tabs-indicator.directive';
import { type HbTabsContext, type HbTabTriggerRef } from './tabs.token';
import {
  type HbTabsActivationMode,
  type HbTabsAlign,
  type HbTabsOrientation,
  type HbTabsPosition,
  type HbTabsSize,
  type HbTabsVariant,
} from './tabs.variants';

let tabsUid = 0;

const slug = (v: unknown): string => String(v).replace(/[^\w-]+/g, '-');

@Directive()
export abstract class HbTabsBase implements HbTabsContext {
  protected readonly uid = ++tabsUid;

  readonly hbValue = model<unknown>(undefined);
  readonly hbDefaultValue = input<unknown>();
  readonly hbVariant = input<HbTabsVariant>('line');
  readonly hbSize = input<HbTabsSize>('md');
  readonly hbPosition = input<HbTabsPosition>('top');
  readonly hbAlign = input<HbTabsAlign>('start');
  readonly hbActivationMode = input<HbTabsActivationMode>('automatic');
  readonly hbShowArrows = input(false, { transform: booleanAttribute });
  readonly hbScrollThreshold = input(0, { transform: numberAttribute });
  readonly hbIndicatorClass = input<ClassValue>('');
  readonly class = input<ClassValue>('');

  readonly hbChange = output<unknown>();

  protected readonly indicatorTpl = contentChild(HbTabsIndicatorDirective, { read: TemplateRef });

  private readonly triggerList = signal<HbTabTriggerRef[]>([]);

  readonly variant = this.hbVariant;
  readonly size = this.hbSize;
  readonly position = this.hbPosition;
  readonly align = this.hbAlign;
  readonly activationMode = this.hbActivationMode;
  readonly showArrows = this.hbShowArrows;
  readonly scrollThreshold = this.hbScrollThreshold;
  readonly orientation = computed<HbTabsOrientation>(() =>
    this.hbPosition() === 'left' || this.hbPosition() === 'right' ? 'vertical' : 'horizontal',
  );

  value = (): unknown => {
    const v = this.hbValue();
    if (v !== undefined && v !== null) return v;
    const d = this.hbDefaultValue();
    if (d !== undefined && d !== null) return d;
    return this.triggerList().find((t) => !t.disabled())?.value();
  };
  isActive(value: unknown): boolean {
    return this.value() === value;
  }
  select(value: unknown): void {
    const trigger = this.triggerList().find((t) => t.value() === value);
    if (trigger?.disabled()) return;
    this.hbValue.set(value);
    this.hbChange.emit(value);
  }

  indicatorTemplate = (): TemplateRef<unknown> | null => this.indicatorTpl() ?? null;
  indicatorClass = (): ClassValue => this.hbIndicatorClass();

  registerTrigger(trigger: HbTabTriggerRef): void {
    this.triggerList.update((list) => [...list, trigger]);
  }
  unregisterTrigger(trigger: HbTabTriggerRef): void {
    this.triggerList.update((list) => list.filter((t) => t !== trigger));
  }
  triggers = (): HbTabTriggerRef[] => this.triggerList();

  private ordered(): HbTabTriggerRef[] {
    return [...this.triggerList()].sort((a, b) =>
      a.element().compareDocumentPosition(b.element()) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
  }
  onTriggerKeydown(trigger: HbTabTriggerRef, event: KeyboardEvent): void {
    const enabled = this.ordered().filter((t) => !t.disabled());
    const i = enabled.indexOf(trigger);
    const horizontal = this.orientation() === 'horizontal';
    const prev = horizontal ? 'ArrowLeft' : 'ArrowUp';
    const next = horizontal ? 'ArrowRight' : 'ArrowDown';
    let target: HbTabTriggerRef | undefined;
    switch (event.key) {
      case prev:
        target = enabled[(i - 1 + enabled.length) % enabled.length];
        break;
      case next:
        target = enabled[(i + 1) % enabled.length];
        break;
      case 'Home':
        target = enabled[0];
        break;
      case 'End':
        target = enabled[enabled.length - 1];
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.select(trigger.value());
        return;
      default:
        return;
    }
    if (!target) return;
    event.preventDefault();
    target.element().focus();
    if (this.hbActivationMode() === 'automatic') this.select(target.value());
  }

  tabId(value: unknown): string {
    return `hb-tabs-${this.uid}-tab-${slug(value)}`;
  }
  panelId(value: unknown): string {
    return `hb-tabs-${this.uid}-panel-${slug(value)}`;
  }
}
