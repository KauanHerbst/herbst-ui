import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  type OnDestroy,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorSpinnerGap } from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HB_BUTTON_GROUP, type HbButtonGroupSize } from '../../core';
import {
  buttonVariants,
  type HbButtonShape,
  type HbButtonSize,
  type HbButtonType,
} from './button.variants';

@Component({
  selector: 'hb-button, button[hb-button], a[hb-button]',
  imports: [NgIcon],
  template: `
    @if (hbLoading()) {
      <ng-icon name="phosphorSpinnerGap" class="animate-spin" />
    }
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ phosphorSpinnerGap })],
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'button'",
    '[attr.data-icon-only]': 'iconOnly() || null',
    '[attr.data-disabled]': 'hbDisabled() || null',
    '[attr.disabled]': 'isNativeButton() && hbDisabled() ? "" : null',
    '[attr.role]': 'needsButtonRole() ? "button" : null',
    '[attr.tabindex]': 'needsButtonRole() ? (hbDisabled() ? "-1" : "0") : null',
    '[attr.aria-disabled]': 'needsButtonRole() && hbDisabled() || null',
  },
  exportAs: 'hbButton',
})
export class HbButtonComponent implements OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly group = inject(HB_BUTTON_GROUP, { optional: true });

  readonly hbType = input<HbButtonType>('default');
  readonly hbSize = input<HbButtonSize>('default');
  readonly hbShape = input<HbButtonShape>('default');
  readonly hbFull = input(false, { transform: booleanAttribute });
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly hbLoading = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  private readonly iconOnlyState = signal(false);
  readonly iconOnly = this.iconOnlyState.asReadonly();

  private mutationObserver: MutationObserver | null = null;

  constructor() {
    afterNextRender(() => {
      if (typeof MutationObserver === 'undefined') return;

      const check = () => {
        const el = this.host.nativeElement;
        const hasIcon = el.querySelector('ng-icon') !== null;
        const hasText = Array.from<ChildNode>(el.childNodes).some((node: ChildNode) => {
          if (node.nodeType === Node.TEXT_NODE) {
            return (node.textContent ?? '').trim() !== '';
          }
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            if (element.tagName.toLowerCase() === 'ng-icon') return false;
            return (element.textContent ?? '').trim() !== '';
          }
          return false;
        });
        this.iconOnlyState.set(hasIcon && !hasText);
      };

      check();
      this.mutationObserver = new MutationObserver(check);
      this.mutationObserver.observe(this.host.nativeElement, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    });
  }

  ngOnDestroy(): void {
    this.mutationObserver?.disconnect();
    this.mutationObserver = null;
  }

  private readonly groupToButtonSize: Record<HbButtonGroupSize, HbButtonSize> = {
    xs: 'xs',
    sm: 'sm',
    md: 'default',
    lg: 'lg',
    xl: 'xl',
  };

  protected readonly effectiveSize = computed<HbButtonSize>(() => {
    const own = this.hbSize();
    if (own === 'icon') return 'icon';
    const groupSize = this.group?.size() ?? null;
    return groupSize ? this.groupToButtonSize[groupSize] : own;
  });

  protected readonly classes = computed(() =>
    cn(
      buttonVariants({
        hbType: this.hbType(),
        hbSize: this.effectiveSize(),
        hbShape: this.hbShape(),
        hbFull: this.hbFull(),
        hbDisabled: this.hbDisabled(),
        hbLoading: this.hbLoading(),
      }),
      this.class(),
    ),
  );

  private readonly tagName = this.host.nativeElement.tagName;

  protected isNativeButton = (): boolean => this.tagName === 'BUTTON';
  protected needsButtonRole = (): boolean =>
    this.tagName !== 'BUTTON' && this.tagName !== 'A';
}
