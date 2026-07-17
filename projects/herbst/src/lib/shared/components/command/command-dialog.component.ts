import { Overlay, type OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  effect,
  inject,
  Injector,
  input,
  model,
  TemplateRef,
  ViewContainerRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { cn, type ClassValue } from '../../utils';
import { HbCommandComponent } from './command.component';

@Component({
  selector: 'hb-command-dialog',
  template: `
    <ng-template #panel>
      <div [class]="panelClasses()"><ng-content /></div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '(document:keydown)': 'onHotkey($event)', '[attr.data-slot]': "'command-dialog'" },
  exportAs: 'hbCommandDialog',
})
export class HbCommandDialogComponent {
  private readonly overlay = inject(Overlay);
  private readonly vcr = inject(ViewContainerRef);
  private readonly injector = inject(Injector);

  readonly hbOpen = model(false);
  readonly hbHotkey = input('');
  readonly class = input<ClassValue>('');

  private readonly panel = viewChild.required<TemplateRef<unknown>>('panel');
  private readonly command = contentChild(HbCommandComponent);
  private readonly destroyRef = inject(DestroyRef);
  private overlayRef: OverlayRef | null = null;
  private closeSubscribed = false;

  protected readonly panelClasses = computed(() =>
    cn('mx-auto w-full max-w-lg overflow-hidden rounded-lg shadow-lg', this.class()),
  );

  constructor() {
    effect(() => (this.hbOpen() ? this.open() : this.close()));
    effect(() => {
      const command = this.command();
      if (command && !this.closeSubscribed) {
        this.closeSubscribed = true;
        const sub = command.hbSelect.subscribe(() => this.hbOpen.set(false));
        this.destroyRef.onDestroy(() => sub.unsubscribe());
      }
    });
  }

  open(): void {
    if (this.overlayRef) return;
    const positionStrategy = this.overlay.position().global().centerHorizontally().top('18vh');
    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
      width: '100%',
      maxWidth: '32rem',
    });
    this.overlayRef.attach(new TemplatePortal(this.panel(), this.vcr));
    this.overlayRef.backdropClick().subscribe(() => this.hbOpen.set(false));
    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') this.hbOpen.set(false);
    });
    afterNextRender(
      () => (this.overlayRef?.overlayElement.querySelector('input') as HTMLElement)?.focus(),
      { injector: this.injector },
    );
  }
  close(): void {
    this.overlayRef?.dispose();
    this.overlayRef = null;
  }
  toggle(): void {
    this.hbOpen.update((v) => !v);
  }

  protected onHotkey(event: KeyboardEvent): void {
    const hotkey = this.hbHotkey();
    if (!hotkey) return;
    const parts = hotkey.toLowerCase().split('+');
    const key = parts[parts.length - 1];
    if (event.key.toLowerCase() !== key) return;
    if (parts.includes('mod') && !(event.ctrlKey || event.metaKey)) return;
    if (parts.includes('ctrl') && !event.ctrlKey) return;
    if (parts.includes('meta') && !event.metaKey) return;
    if (parts.includes('shift') && !event.shiftKey) return;
    if (parts.length === 1) {
      const target = event.target as HTMLElement | null;
      if (target?.closest('input, textarea, [contenteditable]')) return;
    }
    event.preventDefault();
    this.toggle();
  }
}
