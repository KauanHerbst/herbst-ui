import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { booleanAttribute, Directive, ElementRef, inject, input, output } from '@angular/core';
import { CdkContextMenuTrigger } from '@angular/cdk/menu';

@Directive({
  selector: '[hbContextMenuTriggerFor]',
  hostDirectives: [
    {
      directive: CdkContextMenuTrigger,
      inputs: [
        'cdkContextMenuTriggerFor: hbContextMenuTriggerFor',
        'cdkContextMenuPosition: hbContextPosition',
        'cdkContextMenuDisabled: hbContextDisabled',
      ],
    },
  ],
  host: {
    '[attr.data-slot]': "'context-menu-trigger'",
    '(document:contextmenu)': 'onGlobalContextMenu($event)',
  },
  exportAs: 'hbContextMenuTrigger',
})
export class HbContextMenuTriggerDirective {
  private readonly cdk = inject(CdkContextMenuTrigger);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly hbGlobal = input(false, { transform: booleanAttribute });
  readonly hbOpenChange = output<boolean>();

  constructor() {
    this.cdk.opened.pipe(takeUntilDestroyed()).subscribe(() => this.hbOpenChange.emit(true));
    this.cdk.closed.pipe(takeUntilDestroyed()).subscribe(() => this.hbOpenChange.emit(false));
  }

  open(coordinates: { x: number; y: number }): void {
    this.cdk.open(coordinates);
  }
  close(): void {
    this.cdk.close();
  }

  protected onGlobalContextMenu(event: MouseEvent): void {
    if (!this.hbGlobal()) return;
    if (this.host.nativeElement.contains(event.target as Node)) return;
    event.preventDefault();
    this.cdk.open({ x: event.clientX, y: event.clientY });
  }
}
