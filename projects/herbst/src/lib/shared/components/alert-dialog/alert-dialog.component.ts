import { Dialog, type DialogRef } from '@angular/cdk/dialog';
import { type GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  type TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorX } from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent } from '../button';
import { cn, type ClassValue } from '../../utils';
import {
  alertDialogBodyVariants,
  alertDialogDescriptionVariants,
  alertDialogFooterVariants,
  alertDialogHeaderVariants,
  alertDialogPanelVariants,
  alertDialogTitleVariants,
  type HbAlertDialogFooterAlign,
  type HbAlertDialogOkType,
  type HbAlertDialogPosition,
} from './alert-dialog.variants';

let uid = 0;

@Component({
  selector: 'hb-alert-dialog',
  imports: [NgIcon, HbButtonComponent],
  template: `
    <span class="contents" (click)="open()">
      <ng-content select="[hbAlertDialogTrigger]" />
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
          @if (hbClosable()) {
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
          <ng-content select="[hbAlertDialogContent]" />
        </div>

        <div [class]="footerClasses()">
          @if (hbCancelText()) {
            <button hb-button hbType="outline" (click)="onCancel()">{{ hbCancelText() }}</button>
          }
          <button hb-button [hbType]="hbOkType()" [hbDisabled]="hbOkDisabled()" (click)="onOk()">
            {{ hbOkText() }}
          </button>
        </div>
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ phosphorX })],
  host: { '[attr.data-slot]': "'alert-dialog'" },
  exportAs: 'hbAlertDialog',
})
export class HbAlertDialogComponent {
  private readonly dialog = inject(Dialog);
  private readonly overlay = inject(Overlay);

  readonly hbTitle = input('');
  readonly hbDescription = input('');
  readonly hbIcon = input('');
  readonly hbOkText = input('OK');
  readonly hbCancelText = input('Cancel');
  readonly hbOkType = input<HbAlertDialogOkType>('default');
  readonly hbOkDisabled = input(false, { transform: booleanAttribute });
  readonly hbClosable = input(true, { transform: booleanAttribute });
  readonly hbWidth = input('32rem');
  readonly hbPosition = input<HbAlertDialogPosition>('center');
  readonly hbFooterAlign = input<HbAlertDialogFooterAlign>('end');
  readonly hbData = input<object | undefined>(undefined);
  readonly class = input<ClassValue>('');

  readonly hbOk = output<object | undefined>();
  readonly hbCancel = output<object | undefined>();
  readonly hbOpenChange = output<boolean>();

  private readonly panel = viewChild.required<TemplateRef<unknown>>('panel');
  private dialogRef: DialogRef<unknown> | null = null;

  private readonly id = uid++;
  protected readonly titleId = `hb-alert-dialog-title-${this.id}`;
  protected readonly descriptionId = `hb-alert-dialog-desc-${this.id}`;

  protected readonly panelClasses = computed(() =>
    cn(alertDialogPanelVariants(), this.class()),
  );
  protected readonly headerClasses = alertDialogHeaderVariants();
  protected readonly titleClasses = alertDialogTitleVariants();
  protected readonly descriptionClasses = alertDialogDescriptionVariants();
  protected readonly bodyClasses = alertDialogBodyVariants();
  protected readonly footerClasses = computed(() =>
    alertDialogFooterVariants({ align: this.hbFooterAlign() }),
  );

  open(): void {
    if (this.dialogRef) return;
    this.dialogRef = this.dialog.open(this.panel(), {
      role: 'alertdialog',
      hasBackdrop: true,
      disableClose: !this.hbClosable(),
      width: this.hbWidth(),
      maxWidth: 'calc(100vw - 2rem)',
      positionStrategy: this.buildPosition(),
      panelClass: 'hb-alert-dialog-pane',
      ariaLabelledBy: this.hbTitle() ? this.titleId : null,
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
    const m = '1rem';
    switch (this.hbPosition()) {
      case 'top':
        return p.centerHorizontally().top(m);
      case 'bottom':
        return p.centerHorizontally().bottom(m);
      case 'left':
        return p.centerVertically().left(m);
      case 'right':
        return p.centerVertically().right(m);
      case 'top-left':
        return p.top(m).left(m);
      case 'top-right':
        return p.top(m).right(m);
      case 'bottom-left':
        return p.bottom(m).left(m);
      case 'bottom-right':
        return p.bottom(m).right(m);
      default:
        return p.centerHorizontally().centerVertically();
    }
  }
}
