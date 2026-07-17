import {
  type ComponentRef,
  Injectable,
  Injector,
  type Provider,
  inject,
  signal,
} from '@angular/core';
import { Overlay, type OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { HbToastContainerComponent } from './toast.container.component';
import {
  HB_TOAST_CONFIG,
  HB_TOAST_DEFAULTS,
  type HbToastConfig,
  type HbToastGlobalConfig,
  type HbToastPosition,
  type HbToastRef,
} from './toast.types';

type Message = string;
type Resolvable<T> = string | ((value: T) => string);
const resolve = <T>(m: Resolvable<T>, value: T): string =>
  typeof m === 'function' ? m(value) : m;

class HbToastInstance implements HbToastRef {
  private readonly cfg = signal<HbToastConfig>({});
  private readonly pausedSig = signal(false);
  private readonly visibleSig = signal(false);
  readonly config = this.cfg.asReadonly();
  readonly paused = this.pausedSig.asReadonly();
  readonly visible = this.visibleSig.asReadonly();
  readonly position: HbToastPosition;

  private timeoutId: ReturnType<typeof setTimeout> | null = null;
  private startedAt = 0;
  private remaining: number;

  constructor(
    readonly id: number,
    initial: HbToastConfig,
    private readonly onRemove: (id: number) => void,
  ) {
    this.cfg.set(initial);
    this.position = initial.position ?? 'bottom-right';
    this.remaining = initial.duration ?? 0;
  }

  makeVisible(): void {
    if (this.visibleSig()) return;
    this.visibleSig.set(true);
    this.remaining = this.cfg().duration ?? 0;
    this.startTimer();
  }

  private startTimer(): void {
    this.clearTimer();
    const c = this.cfg();
    if (c.type === 'loading' || !(c.duration && c.duration > 0)) return;
    this.startedAt = Date.now();
    this.timeoutId = setTimeout(() => this.dismiss(), this.remaining);
  }
  private clearTimer(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  pause(): void {
    if (!this.visibleSig() || this.pausedSig() || !this.timeoutId) return;
    this.remaining -= Date.now() - this.startedAt;
    this.clearTimer();
    this.pausedSig.set(true);
  }
  resume(): void {
    if (!this.pausedSig()) return;
    this.pausedSig.set(false);
    this.startTimer();
  }
  update(patch: Partial<HbToastConfig>): void {
    const next = { ...this.cfg(), ...patch };
    this.cfg.set(next);
    this.remaining = next.duration ?? 0;
    this.pausedSig.set(false);
    if (this.visibleSig()) this.startTimer();
  }
  dismiss(): void {
    this.clearTimer();
    this.cfg().onDismiss?.();
    this.onRemove(this.id);
  }
  destroy(): void {
    this.clearTimer();
  }
}

@Injectable({ providedIn: 'root' })
export class HbToastService {
  private readonly overlay = inject(Overlay);
  private readonly injector = inject(Injector);
  private readonly resolved: HbToastGlobalConfig = {
    ...HB_TOAST_DEFAULTS,
    ...(inject(HB_TOAST_CONFIG, { optional: true }) ?? {}),
  };

  private readonly instances = signal<HbToastInstance[]>([]);
  private readonly overlays = new Map<
    HbToastPosition,
    { overlayRef: OverlayRef; compRef: ComponentRef<HbToastContainerComponent> }
  >();
  private counter = 0;

  show(config: HbToastConfig): HbToastRef {
    const inst = new HbToastInstance(++this.counter, this.merge(config), (id) => this.remove(id));
    this.instances.update((list) => [...list, inst]);
    this.reconcile(inst.position);
    this.ensureOverlay(inst.position);
    this.push();
    return inst;
  }

  default(title: Message, opts?: HbToastConfig): HbToastRef {
    return this.show({ ...opts, type: 'default', title });
  }
  success(title: Message, opts?: HbToastConfig): HbToastRef {
    return this.show({ ...opts, type: 'success', title });
  }
  info(title: Message, opts?: HbToastConfig): HbToastRef {
    return this.show({ ...opts, type: 'info', title });
  }
  warning(title: Message, opts?: HbToastConfig): HbToastRef {
    return this.show({ ...opts, type: 'warning', title });
  }
  destructive(title: Message, opts?: HbToastConfig): HbToastRef {
    return this.show({ ...opts, type: 'destructive', title });
  }
  loading(title: Message, opts?: HbToastConfig): HbToastRef {
    return this.show({ ...opts, type: 'loading', title });
  }

  promise<T>(
    promise: Promise<T>,
    messages: { loading: Message; success: Resolvable<T>; error: Resolvable<unknown> },
    opts?: HbToastConfig,
  ): HbToastRef {
    const ref = this.loading(messages.loading, opts);
    promise
      .then((value) =>
        ref.update({
          type: 'success',
          title: resolve(messages.success, value),
          duration: this.resolved.duration,
        }),
      )
      .catch((err) =>
        ref.update({
          type: 'destructive',
          title: resolve(messages.error, err),
          duration: this.resolved.duration,
        }),
      );
    return ref;
  }

  dismiss(id?: number): void {
    if (id === undefined) return this.clear();
    this.instances()
      .find((i) => i.id === id)
      ?.dismiss();
  }
  clear(): void {
    [...this.instances()].forEach((i) => i.dismiss());
  }

  private remove(id: number): void {
    const inst = this.instances().find((i) => i.id === id);
    const pos = inst?.position;
    inst?.destroy();
    this.instances.update((list) => list.filter((i) => i.id !== id));
    if (pos) {
      this.reconcile(pos);
      this.push();
      this.maybeDisposeOverlay(pos);
    }
  }

  private reconcile(position: HbToastPosition): void {
    const max = this.resolved.maxVisible;
    const inPos = this.instances().filter((i) => i.position === position);
    inPos.forEach((inst, idx) => {
      if (max <= 0 || idx < max) inst.makeVisible();
    });
  }

  private push(): void {
    for (const [pos, o] of this.overlays) {
      const visible = this.instances().filter((i) => i.position === pos && i.visible());
      const ordered = pos.startsWith('top') ? [...visible].reverse() : visible;
      o.compRef.setInput('toasts', ordered);
      o.compRef.setInput('gap', this.resolved.gap);
      o.compRef.setInput('hostClass', this.hostClass(pos));
      o.compRef.changeDetectorRef.markForCheck();
    }
  }

  private ensureOverlay(position: HbToastPosition): void {
    if (this.overlays.has(position)) return;
    const overlayRef = this.overlay.create({
      positionStrategy: this.buildPosition(position),
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      panelClass: 'hb-toast-overlay',
    });
    const compRef = overlayRef.attach(
      new ComponentPortal(HbToastContainerComponent, null, this.injector),
    );
    this.overlays.set(position, { overlayRef, compRef });
  }

  private maybeDisposeOverlay(position: HbToastPosition): void {
    const has = this.instances().some((i) => i.position === position);
    if (has) return;
    this.overlays.get(position)?.overlayRef.dispose();
    this.overlays.delete(position);
  }

  private buildPosition(position: HbToastPosition) {
    const s = this.overlay.position().global();
    const o = this.resolved.offset;
    switch (position) {
      case 'top-left':
        return s.top(o).left(o);
      case 'top-center':
        return s.top(o).centerHorizontally();
      case 'top-right':
        return s.top(o).right(o);
      case 'bottom-left':
        return s.bottom(o).left(o);
      case 'bottom-center':
        return s.bottom(o).centerHorizontally();
      case 'bottom-right':
        return s.bottom(o).right(o);
      case 'center':
        return s.centerHorizontally().centerVertically();
    }
  }

  private hostClass(position: HbToastPosition): string {
    const align = position.endsWith('left')
      ? 'items-start'
      : position.endsWith('right')
        ? 'items-end'
        : 'items-center';
    return `pointer-events-none flex flex-col ${align}`;
  }

  private merge(c: HbToastConfig): HbToastConfig {
    const d = this.resolved;
    const type = c.type ?? 'default';
    return {
      type,
      title: c.title,
      description: c.description,
      icon: c.icon,
      actions: c.actions,
      class: c.class,
      onDismiss: c.onDismiss,
      position: c.position ?? d.position,
      closable: c.closable ?? d.closable,
      pauseOnHover: c.pauseOnHover ?? d.pauseOnHover,
      progressBar: c.progressBar ?? d.progressBar,
      duration: type === 'loading' ? 0 : (c.duration ?? d.duration),
    };
  }
}

export function provideHbToast(config: Partial<HbToastGlobalConfig>): Provider {
  return { provide: HB_TOAST_CONFIG, useValue: config };
}
