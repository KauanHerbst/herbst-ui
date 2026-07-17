import { Dialog, type DialogRef } from '@angular/cdk/dialog';
import { type GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  type TemplateRef,
  untracked,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorX } from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent } from '../button';
import { cn, type ClassValue } from '../../utils';
import {
  sheetBodyVariants,
  sheetDescriptionVariants,
  sheetFooterVariants,
  sheetHeaderVariants,
  sheetPanelVariants,
  sheetTitleVariants,
  type HbSheetFooterAlign,
  type HbSheetOkType,
  type HbSheetSide,
} from './sheet.variants';

let uid = 0;

@Component({
  selector: 'hb-sheet',
  imports: [NgIcon, HbButtonComponent],
  viewProviders: [provideIcons({ phosphorX })],
  template: `
    <span class="contents" (click)="open()">
      <ng-content select="[hbSheetTrigger]" />
    </span>

    <ng-template #panel>
      <div [class]="panelClasses()">
        <div [class]="headerClasses">
          @if (hbIcon()) {
            <ng-icon [name]="hbIcon()" class="mt-0.5 shrink-0 [&>svg]:size-5" />
          }
          <div class="min-w-0 flex-1">
            @if (hbTitle()) {
              <h2 [id]="titleId" [class]="titleClasses">{{ hbTitle() }}</h2>
            }
            @if (hbDescription()) {
              <p [id]="descriptionId" [class]="descriptionClasses">{{ hbDescription() }}</p>
            }
          </div>
          @if (showClose()) {
            <button
              hb-button
              hbType="ghost"
              hbSize="icon"
              class="-mt-2 -mr-2"
              aria-label="Close"
              (click)="close()"
            >
              <ng-icon name="phosphorX" />
            </button>
          }
        </div>

        <div [class]="bodyClasses">
          <ng-content select="[hbSheetContent]" />
        </div>

        @if (hbShowFooter()) {
          <div [class]="footerClasses()">
            <ng-content select="[hbSheetFooter]" />
            @if (hbCancelText()) {
              <button
                hb-button
                hbType="outline"
                [hbDisabled]="hbCancelDisabled()"
                (click)="onCancel()"
              >
                @if (hbCancelIcon()) {
                  <ng-icon [name]="hbCancelIcon()" />
                }
                {{ hbCancelText() }}
              </button>
            }
            @if (hbOkText()) {
              <button hb-button [hbType]="hbOkType()" [hbDisabled]="hbOkDisabled()" (click)="onOk()">
                @if (hbOkIcon()) {
                  <ng-icon [name]="hbOkIcon()" />
                }
                {{ hbOkText() }}
              </button>
            }
          </div>
        }
      </div>
    </ng-template>
  `,
  styles: `
    @keyframes hb-sheet-in-right {
      from {
        transform: translateX(100%);
      }
    }
    @keyframes hb-sheet-in-left {
      from {
        transform: translateX(-100%);
      }
    }
    @keyframes hb-sheet-in-top {
      from {
        transform: translateY(-100%);
      }
    }
    @keyframes hb-sheet-in-bottom {
      from {
        transform: translateY(100%);
      }
    }
    .hb-sheet-anim-right {
      animation: hb-sheet-in-right 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .hb-sheet-anim-left {
      animation: hb-sheet-in-left 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .hb-sheet-anim-top {
      animation: hb-sheet-in-top 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .hb-sheet-anim-bottom {
      animation: hb-sheet-in-bottom 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[attr.data-slot]': "'sheet'" },
  exportAs: 'hbSheet',
})
export class HbSheetComponent {
  private readonly dialog = inject(Dialog);
  private readonly overlay = inject(Overlay);

  readonly hbSide = input<HbSheetSide>('right');
  readonly hbSize = input('24rem');
  readonly hbTitle = input('');
  readonly hbDescription = input('');
  readonly hbIcon = input('');
  readonly hbOkText = input('OK');
  readonly hbCancelText = input('Cancel');
  readonly hbOkType = input<HbSheetOkType>('default');
  readonly hbOkIcon = input('');
  readonly hbCancelIcon = input('');
  readonly hbOkDisabled = input(false, { transform: booleanAttribute });
  readonly hbCancelDisabled = input(false, { transform: booleanAttribute });
  readonly hbClosable = input(true, { transform: booleanAttribute });
  readonly hbShowClose = input(true, { transform: booleanAttribute });
  readonly hbShowFooter = input(true, { transform: booleanAttribute });
  readonly hbFooterAlign = input<HbSheetFooterAlign>('end');
  readonly hbData = input<object | undefined>(undefined);
  readonly hbOpen = input<boolean | undefined>(undefined);
  readonly class = input<ClassValue>('');

  readonly hbOk = output<object | undefined>();
  readonly hbCancel = output<object | undefined>();
  readonly hbOpenChange = output<boolean>();

  private readonly panel = viewChild.required<TemplateRef<unknown>>('panel');
  private dialogRef: DialogRef<unknown> | null = null;

  private readonly id = uid++;
  protected readonly titleId = `hb-sheet-title-${this.id}`;
  protected readonly descriptionId = `hb-sheet-desc-${this.id}`;

  protected readonly showClose = computed(() => this.hbShowClose() && this.hbClosable());
  protected readonly panelClasses = computed(() =>
    cn(sheetPanelVariants({ side: this.hbSide() }), `hb-sheet-anim-${this.hbSide()}`, this.class()),
  );
  protected readonly headerClasses = sheetHeaderVariants();
  protected readonly titleClasses = sheetTitleVariants();
  protected readonly descriptionClasses = sheetDescriptionVariants();
  protected readonly bodyClasses = sheetBodyVariants();
  protected readonly footerClasses = computed(() =>
    sheetFooterVariants({ align: this.hbFooterAlign() }),
  );

  constructor() {
    effect(() => {
      const open = this.hbOpen();
      if (open === undefined) return;
      untracked(() => (open ? this.open() : this.close()));
    });
  }

  open(): void {
    if (this.dialogRef) return;
    const side = this.hbSide();
    const vertical = side === 'left' || side === 'right';
    this.dialogRef = this.dialog.open(this.panel(), {
      role: 'dialog',
      hasBackdrop: true,
      disableClose: !this.hbClosable(),
      width: vertical ? this.hbSize() : '100vw',
      height: vertical ? '100dvh' : this.hbSize(),
      maxWidth: '100vw',
      maxHeight: '100dvh',
      positionStrategy: this.buildPosition(),
      panelClass: 'hb-sheet-pane',
      ariaLabelledBy: this.hbTitle() ? this.titleId : null,
      ariaDescribedBy: this.hbDescription() ? this.descriptionId : null,
    });
    this.hbOpenChange.emit(true);
    this.dialogRef.closed.subscribe(() => {
      this.dialogRef = null;
      this.hbOpenChange.emit(false);
    });
  }

  close(): void {
    this.dialogRef?.close();
  }

  protected onOk(): void {
    this.hbOk.emit(this.hbData());
    this.close();
  }

  protected onCancel(): void {
    this.hbCancel.emit(this.hbData());
    this.close();
  }

  private buildPosition(): GlobalPositionStrategy {
    const p = this.overlay.position().global();
    switch (this.hbSide()) {
      case 'left':
        return p.left('0').top('0');
      case 'top':
        return p.top('0').left('0');
      case 'bottom':
        return p.bottom('0').left('0');
      case 'right':
      default:
        return p.right('0').top('0');
    }
  }
}
