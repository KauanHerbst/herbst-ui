import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorMagnifyingGlass } from '@ng-icons/phosphor-icons/regular';

import { commandInputVariants } from './command.variants';
import { HB_COMMAND } from './command.token';

@Component({
  selector: 'hb-command-input',
  imports: [NgIcon],
  viewProviders: [provideIcons({ phosphorMagnifyingGlass })],
  template: `
    <ng-icon name="phosphorMagnifyingGlass" class="size-4 shrink-0 text-muted-foreground" />
    <input
      #input
      type="text"
      autocomplete="off"
      [class]="inputClasses()"
      [placeholder]="hbPlaceholder()"
      [value]="command.query()"
      (input)="onInput($event)"
      (keydown)="command.onKeydown($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': "'flex items-center gap-2 border-b border-border px-3'", '[attr.data-slot]': "'command-input'" },
  exportAs: 'hbCommandInput',
})
export class HbCommandInputComponent {
  protected readonly command = inject(HB_COMMAND);
  private readonly inputEl = viewChild.required<ElementRef<HTMLInputElement>>('input');
  readonly hbPlaceholder = input('Type a command or search…');
  protected readonly inputClasses = computed(() =>
    commandInputVariants({ size: this.command.hbSize() }),
  );
  constructor() {
    this.command.registerInput(this);
  }
  protected onInput(event: Event): void {
    this.command.setQuery((event.target as HTMLInputElement).value);
  }
  focus(): void {
    this.inputEl().nativeElement.focus();
  }
}
