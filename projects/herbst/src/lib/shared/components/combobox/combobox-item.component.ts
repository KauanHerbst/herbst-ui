import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheck } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { selectIndicatorVariants, selectItemVariants } from '../select';
import { HB_COMBOBOX } from './combobox.token';



let comboboxItemUid = 0;
@Component({
  selector: 'hb-combobox-item',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorCheck })],
  template: `
    @if (multiple()) {
      <span [class]="checkboxClasses()">
        @if (checked()) {
          <ng-icon name="phosphorCheck" class="size-3" />
        }
      </span>
    } @else {
      <span [class]="indicatorClasses">
        @if (checked()) {
          <ng-icon name="phosphorCheck" />
        }
      </span>
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[id]': 'optionId',
    role: 'option',
    '[class]': 'classes()',
    '[style.display]': "matches() ? null : 'none'",
    '[attr.aria-selected]': 'checked()',
    '[attr.aria-disabled]': 'hbDisabled() || null',
    '[attr.data-active]': 'active() || null',
    '[attr.data-slot]': "'combobox-item'",
    '(click)': 'onClick()',
    '(mouseenter)': 'onEnter()',
  },
  exportAs: 'hbComboboxItem',
})
export class HbComboboxItemComponent {
  private readonly cbx = inject(HB_COMBOBOX);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly optionId = `hb-combobox-item-${++comboboxItemUid}`;
  readonly hbValue = input<unknown>(null);
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbLabel = input<string>('');
  readonly class = input<ClassValue>('');

  private readonly textLabel = signal('');
  readonly label = computed(() => this.hbLabel() || this.textLabel());
  readonly matches = computed(() => this.cbx.matchesFilter(this.label()));
  protected readonly multiple = computed(() => this.cbx.hbMultiple());
  protected readonly checked = computed(() => this.cbx.isSelected(this.hbValue()));
  protected readonly active = computed(() => this.cbx.activeEntryFor(this));

  protected readonly indicatorClasses = selectIndicatorVariants();
  protected readonly classes = computed(() =>
    cn(
      selectItemVariants(),
      this.multiple() ? 'pl-8 pr-2' : 'pr-8',
      'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
      this.class(),
    ),
  );
  protected checkboxClasses(): string {
    return cn(
      'absolute left-2 flex size-4 items-center justify-center rounded-[4px] border border-input',
      this.checked() ? 'border-primary bg-primary text-primary-foreground' : '',
    );
  }

  constructor() {
    afterNextRender(() => this.textLabel.set((this.host.nativeElement.textContent ?? '').trim()));
    effect(() => this.cbx.reportLabel(this.hbValue(), this.label()));
  }

  protected onClick(): void {
    if (!this.hbDisabled()) this.cbx.selectValue(this.hbValue());
  }
  protected onEnter(): void {
    if (!this.hbDisabled()) this.cbx.setActiveByItem(this);
  }
}
