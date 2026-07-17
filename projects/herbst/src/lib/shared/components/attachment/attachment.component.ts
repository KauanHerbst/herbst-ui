import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  effect,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';

import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorFile,
  phosphorWarningCircle,
  phosphorX,
} from '@ng-icons/phosphor-icons/regular';

import { HbButtonComponent } from '../button';
import { cn, type ClassValue } from '../../utils';
import {
  attachmentBodyVariants,
  attachmentDescriptionVariants,
  attachmentMediaVariants,
  attachmentTitleVariants,
  attachmentVariants,
  type HbAttachmentOrientation,
  type HbAttachmentSize,
  type HbAttachmentState,
} from './attachment.variants';

@Directive({ selector: '[hbAttachmentAction]' })
export class HbAttachmentActionDirective {}

@Component({
  selector: 'hb-attachment, [hb-attachment]',
  imports: [NgIcon, NgTemplateOutlet, HbButtonComponent],
  template: `
    @if (hbOrientation() === 'vertical') {
      <div
        class="relative flex aspect-square w-full items-center justify-center overflow-hidden bg-muted text-muted-foreground"
        [class.cursor-pointer]="hbClickable()"
        data-slot="attachment-media"
        (click)="onBodyClick()"
      >
        @if (hbSrc() && !imageError()) {
          <img
            [src]="hbSrc()"
            [alt]="hbName()"
            class="size-full object-cover"
            (error)="imageError.set(true)"
          />
        } @else {
          <ng-icon [name]="mediaIcon()" class="[&>svg]:size-10" />
        }

        @if (hbRemovable()) {
          <div class="absolute top-1.5 right-1.5 flex gap-1" data-slot="attachment-actions">
            <ng-content select="[hbAttachmentAction]" />
            <button
              hb-button
              hbType="ghost"
              hbSize="icon"
              class="size-7 bg-background/80 hover:bg-background"
              aria-label="Remove"
              (click)="onRemove($event)"
            >
              <ng-icon name="phosphorX" />
            </button>
          </div>
        }
      </div>

      <div class="flex flex-col gap-0.5 p-2.5" (click)="onBodyClick()">
        @if (hbName()) {
          <span [class]="titleClasses()" data-slot="attachment-title">{{ hbName() }}</span>
        }
        @if (hbDescription()) {
          <span [class]="descriptionClasses" data-slot="attachment-description">
            {{ hbDescription() }}
          </span>
        }
        @if (showProgress()) {
          <ng-container [ngTemplateOutlet]="progressBar" />
        }
      </div>
    } @else {
      <div [class]="bodyClasses()" (click)="onBodyClick()">
        <span [class]="mediaClasses()" data-slot="attachment-media">
          @if (hbSrc() && !imageError()) {
            <img
              [src]="hbSrc()"
              [alt]="hbName()"
              class="size-full object-cover"
              (error)="imageError.set(true)"
            />
          } @else {
            <ng-icon [name]="mediaIcon()" />
          }
        </span>

        <span class="flex min-w-0 flex-1 flex-col" data-slot="attachment-content">
          @if (hbName()) {
            <span [class]="titleClasses()" data-slot="attachment-title">{{ hbName() }}</span>
          }
          @if (hbDescription()) {
            <span [class]="descriptionClasses" data-slot="attachment-description">
              {{ hbDescription() }}
            </span>
          }
          @if (showProgress()) {
            <ng-container [ngTemplateOutlet]="progressBar" />
          }
        </span>
      </div>

      <div [class]="actionsClasses()" data-slot="attachment-actions">
        <ng-content select="[hbAttachmentAction]" />
        @if (hbRemovable()) {
          <button hb-button hbType="ghost" hbSize="icon" aria-label="Remove" (click)="onRemove($event)">
            <ng-icon name="phosphorX" />
          </button>
        }
      </div>
    }

    <ng-template #progressBar>
      <span
        class="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        [attr.aria-valuenow]="hbProgress()"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <span
          class="block h-full rounded-full bg-primary transition-all"
          [style.width.%]="hbProgress()"
        ></span>
      </span>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  viewProviders: [provideIcons({ phosphorFile, phosphorX, phosphorWarningCircle })],
  host: {
    '[class]': 'classes()',
    role: 'group',
    '[attr.aria-label]': 'hbName() || null',
    '[attr.data-state]': 'hbState()',
    '[attr.data-disabled]': 'hbDisabled() ? "" : null',
  },
  exportAs: 'hbAttachment',
})
export class HbAttachmentComponent {
  readonly hbName = input('');
  readonly hbDescription = input('');
  readonly hbSrc = input('');
  readonly hbIcon = input('');
  readonly hbState = input<HbAttachmentState>('done');
  readonly hbSize = input<HbAttachmentSize>('md');
  readonly hbOrientation = input<HbAttachmentOrientation>('horizontal');
  readonly hbProgress = input<number | null>(null);
  readonly hbRemovable = input(false, { transform: booleanAttribute });
  readonly hbClickable = input(false, { transform: booleanAttribute });
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly hbRemove = output<void>();
  readonly hbClick = output<void>();

  protected readonly imageError = signal(false);

  constructor() {
    effect(() => {
      this.hbSrc();
      this.imageError.set(false);
    });
  }

  protected readonly classes = computed(() =>
    cn(
      attachmentVariants({
        size: this.hbSize(),
        orientation: this.hbOrientation(),
        state: this.hbState(),
      }),
      this.hbDisabled() ? 'pointer-events-none opacity-50' : '',
      this.class(),
    ),
  );

  protected readonly bodyClasses = computed(() =>
    attachmentBodyVariants({
      size: this.hbSize(),
      orientation: this.hbOrientation(),
      clickable: this.hbClickable(),
    }),
  );

  protected readonly mediaClasses = computed(() => attachmentMediaVariants({ size: this.hbSize() }));
  protected readonly titleClasses = computed(() => attachmentTitleVariants({ state: this.hbState() }));
  protected readonly descriptionClasses = cn(attachmentDescriptionVariants());

  protected readonly actionsClasses = computed(() =>
    cn(
      'flex shrink-0 items-center gap-1',
      this.hbOrientation() === 'vertical' ? 'w-full justify-end' : '',
    ),
  );

  protected readonly mediaIcon = computed(() =>
    this.hbState() === 'error' ? 'phosphorWarningCircle' : this.hbIcon() || 'phosphorFile',
  );

  protected readonly showProgress = computed(() => {
    const p = this.hbProgress();
    const s = this.hbState();
    return p != null && (s === 'uploading' || s === 'processing');
  });

  protected onRemove(event: Event): void {
    event.stopPropagation();
    this.hbRemove.emit();
  }

  protected onBodyClick(): void {
    if (this.hbClickable()) this.hbClick.emit();
  }
}
