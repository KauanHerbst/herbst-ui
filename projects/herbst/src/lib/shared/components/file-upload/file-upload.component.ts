import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  DestroyRef,
  ElementRef,
  inject,
  input,
  numberAttribute,
  output,
  signal,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorCheck,
  phosphorCloudArrowUp,
  phosphorFile,
  phosphorImage,
  phosphorTrash,
  phosphorUploadSimple,
  phosphorWarningCircle,
  phosphorX,
} from '@ng-icons/phosphor-icons/regular';

import { cn, type ClassValue } from '../../utils';
import { HbButtonComponent } from '../button';
import { HbUploadEmptyDirective } from './upload-empty.directive';
import { HbUploadFileDirective } from './upload-file.directive';
import { HbUploadHeaderDirective } from './upload-header.directive';
import { dropzoneVariants, fileUploadClass, uploadItemClass } from './file-upload.variants';
import type {
  HbFileUploadFileContext,
  HbFileUploadHeaderContext,
  HbFileUploadMode,
  HbUploadComplete,
  HbUploadError,
  HbUploadErrorReason,
  HbUploadEvent,
  HbUploadFile,
  HbUploadProgress,
} from './file-upload.types';




function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}
let fileUploadUid = 0;
@Component({
  selector: 'hb-file-upload',
  imports: [NgIcon, NgTemplateOutlet, HbButtonComponent],
  viewProviders: [
    provideIcons({
      phosphorUploadSimple,
      phosphorCloudArrowUp,
      phosphorFile,
      phosphorImage,
      phosphorX,
      phosphorTrash,
      phosphorCheck,
      phosphorWarningCircle,
    }),
  ],
  template: `
    <input
      #input
      type="file"
      class="hidden"
      data-slot="file-upload-input"
      [multiple]="hbMultiple()"
      [attr.accept]="hbAccept() || null"
      [disabled]="hbDisabled()"
      (change)="onInputChange($event)"
    />

    @if (hbMode() === 'basic') {
      <div class="flex items-center gap-3">
        <button hb-button [disabled]="hbDisabled()" (click)="choose()">
          <ng-icon name="phosphorUploadSimple" />
          {{ hbChooseLabel() }}
        </button>
        @if (files().length) {
          <span class="truncate text-sm text-muted-foreground">{{ files()[0].name }}</span>
        }
      </div>
    } @else {
      @if (headerTpl(); as tpl) {
        <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="{ $implicit: headerContext() }" />
      } @else {
        <div class="flex flex-wrap gap-2" data-slot="file-upload-toolbar">
          <button hb-button [disabled]="hbDisabled()" (click)="choose()">
            <ng-icon name="phosphorUploadSimple" />
            {{ hbChooseLabel() }}
          </button>
          <button
            hb-button
            hbVariant="outline"
            [disabled]="hbDisabled() || !hasPending()"
            (click)="upload()"
          >
            <ng-icon name="phosphorCloudArrowUp" />
            {{ hbUploadLabel() }}
          </button>
          <button
            hb-button
            hbVariant="outline"
            [disabled]="hbDisabled() || !files().length"
            (click)="clear()"
          >
            <ng-icon name="phosphorTrash" />
            {{ hbClearLabel() }}
          </button>
        </div>
      }

      <div
        [class]="dropzoneClasses()"
        data-slot="file-upload-dropzone"
        [attr.data-dragover]="dragover() || null"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
      >
        @if (files().length) {
          <ul class="flex w-full flex-col gap-2" data-slot="file-upload-list">
            @for (f of files(); track f.id) {
              @if (fileTpl(); as tpl) {
                <ng-container [ngTemplateOutlet]="tpl" [ngTemplateOutletContext]="fileContext(f)" />
              } @else {
                <li [class]="itemClass" data-slot="file-upload-item" [attr.data-status]="f.status">
                  @if (hbShowPreview() && f.objectUrl) {
                    <img
                      [src]="f.objectUrl"
                      [alt]="f.name"
                      class="size-10 shrink-0 rounded object-cover"
                      data-slot="file-upload-preview"
                    />
                  } @else {
                    <span class="flex size-10 shrink-0 items-center justify-center rounded bg-muted">
                      <ng-icon [name]="isImage(f) ? 'phosphorImage' : 'phosphorFile'" />
                    </span>
                  }
                  <div class="flex min-w-0 flex-1 flex-col gap-1 text-left">
                    <div class="flex items-center justify-between gap-2">
                      <span class="truncate font-medium">{{ f.name }}</span>
                      <span class="shrink-0 text-xs text-muted-foreground">{{ formatSize(f.size) }}</span>
                    </div>
                    @if (f.status === 'uploading' || f.status === 'success') {
                      <div
                        class="h-1.5 w-full overflow-hidden rounded-full bg-muted"
                        data-slot="file-upload-progress"
                      >
                        <div
                          class="h-full rounded-full bg-primary transition-[width] duration-200"
                          [style.width.%]="f.progress"
                        ></div>
                      </div>
                    } @else if (f.status === 'error') {
                      <span class="text-xs text-destructive">{{ f.error }}</span>
                    }
                  </div>
                  <span class="flex shrink-0 items-center">
                    @switch (f.status) {
                      @case ('success') {
                        <ng-icon name="phosphorCheck" class="text-primary" />
                      }
                      @case ('error') {
                        <ng-icon name="phosphorWarningCircle" class="text-destructive" />
                      }
                      @default {
                        <button
                          hb-button
                          hbVariant="ghost"
                          hbSize="icon"
                          class="size-8"
                          aria-label="Remove"
                          [disabled]="f.status === 'uploading'"
                          (click)="remove(f)"
                        >
                          <ng-icon name="phosphorX" />
                        </button>
                      }
                    }
                  </span>
                </li>
              }
            }
          </ul>
        } @else if (emptyTpl(); as tpl) {
          <ng-container [ngTemplateOutlet]="tpl" />
        } @else {
          <ng-icon name="phosphorCloudArrowUp" class="text-3xl text-muted-foreground" />
          <p class="text-sm text-muted-foreground">{{ hbDropLabel() }}</p>
        }
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.data-slot]': "'file-upload'",
    '[attr.data-mode]': 'hbMode()',
  },
  exportAs: 'hbFileUpload',
})
export class HbFileUploadComponent {
  readonly hbMode = input<HbFileUploadMode>('advanced');
  readonly hbMultiple = input(false, { transform: booleanAttribute });
  readonly hbAccept = input('');
  readonly hbMaxFileSize = input(0, { transform: numberAttribute });
  readonly hbFileLimit = input(0, { transform: numberAttribute });
  readonly hbAuto = input(false, { transform: booleanAttribute });
  readonly hbUrl = input('');
  readonly hbName = input('files');
  readonly hbWithCredentials = input(false, { transform: booleanAttribute });
  readonly hbShowPreview = input(true, { transform: booleanAttribute });
  readonly hbChooseLabel = input('Choose');
  readonly hbUploadLabel = input('Upload');
  readonly hbClearLabel = input('Clear');
  readonly hbDropLabel = input('Drag and drop files here');
  readonly hbDisabled = input(false, { transform: booleanAttribute });
  readonly class = input<ClassValue>('');

  readonly hbSelect = output<HbUploadFile[]>();
  readonly hbRemove = output<HbUploadFile>();
  readonly hbClear = output<void>();
  readonly hbUpload = output<HbUploadEvent>();
  readonly hbProgress = output<HbUploadProgress>();
  readonly hbComplete = output<HbUploadComplete>();
  readonly hbUploadError = output<HbUploadError>();

  private readonly inputRef = viewChild.required<ElementRef<HTMLInputElement>>('input');
  private readonly destroyRef = inject(DestroyRef);

  protected readonly headerTpl = contentChild(HbUploadHeaderDirective, { read: TemplateRef });
  protected readonly fileTpl = contentChild(HbUploadFileDirective, { read: TemplateRef });
  protected readonly emptyTpl = contentChild(HbUploadEmptyDirective, { read: TemplateRef });

  private readonly fileList = signal<HbUploadFile[]>([]);
  protected readonly dragover = signal(false);
  private readonly objectUrls = new Set<string>();

  readonly files = this.fileList.asReadonly();
  protected readonly hasPending = computed(() =>
    this.fileList().some((f) => f.status === 'pending' || f.status === 'error'),
  );
  private readonly uploading = computed(() => this.fileList().some((f) => f.status === 'uploading'));

  protected readonly itemClass = uploadItemClass;
  protected readonly classes = computed(() => cn(fileUploadClass, this.class()));
  protected readonly dropzoneClasses = computed(() =>
    dropzoneVariants({ dragover: this.dragover(), disabled: this.hbDisabled() }),
  );

  constructor() {
    this.destroyRef.onDestroy(() => this.revokeAll());
  }

  choose(): void {
    if (this.hbDisabled()) return;
    this.inputRef().nativeElement.click();
  }

  protected onInputChange(event: Event): void {
    const el = event.target as HTMLInputElement;
    if (el.files?.length) this.addFiles(Array.from(el.files));
    el.value = '';
  }

  protected onDragOver(event: DragEvent): void {
    if (this.hbDisabled()) return;
    event.preventDefault();
    this.dragover.set(true);
  }
  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragover.set(false);
  }
  protected onDrop(event: DragEvent): void {
    if (this.hbDisabled()) return;
    event.preventDefault();
    this.dragover.set(false);
    const dropped = event.dataTransfer?.files;
    if (dropped?.length) this.addFiles(Array.from(dropped));
  }

  upload(): void {
    const pending = this.fileList().filter((f) => f.status === 'pending' || f.status === 'error');
    if (!pending.length) return;
    if (this.hbUrl()) {
      pending.forEach((f) => this.uploadViaXhr(f));
    } else {
      pending.forEach((f) => this.patch(f.id, { status: 'uploading', progress: 0, error: undefined }));
      this.hbUpload.emit({ files: pending.map((f) => f.file) });
    }
  }

  remove(target: HbUploadFile): void {
    if (target.objectUrl) this.revoke(target.objectUrl);
    this.fileList.update((list) => list.filter((f) => f.id !== target.id));
    this.hbRemove.emit(target);
  }

  clear(): void {
    this.clearInternal(true);
  }

  setProgress(id: string, progress: number): void {
    this.patch(id, { status: 'uploading', progress: clamp(progress) });
  }
  setSuccess(id: string): void {
    this.patch(id, { status: 'success', progress: 100, error: undefined });
  }
  setError(id: string, message: string): void {
    this.patch(id, { status: 'error', error: message });
  }

  protected headerContext(): HbFileUploadHeaderContext {
    return {
      files: this.fileList(),
      uploading: this.uploading(),
      choose: () => this.choose(),
      upload: () => this.upload(),
      clear: () => this.clear(),
    };
  }
  protected fileContext(file: HbUploadFile): HbFileUploadFileContext {
    return { $implicit: file, remove: () => this.remove(file) };
  }

  protected isImage(file: HbUploadFile): boolean {
    return file.file.type.startsWith('image/');
  }
  protected formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private addFiles(incoming: File[]): void {
    if (this.hbDisabled()) return;
    let files = incoming;
    if (!this.hbMultiple()) {
      this.clearInternal(false);
      files = files.slice(0, 1);
    }
    const added: HbUploadFile[] = [];
    for (const file of files) {
      if (!this.matchesAccept(file)) {
        this.emitError('accept', file, `File type not allowed: ${file.name}`);
        continue;
      }
      const max = this.hbMaxFileSize();
      if (max && file.size > max) {
        this.emitError('max-file-size', file, `File exceeds the maximum size: ${file.name}`);
        continue;
      }
      const limit = this.hbFileLimit();
      if (limit && this.fileList().length + added.length >= limit) {
        this.emitError('file-limit', file, `Maximum number of files reached`);
        continue;
      }
      added.push(this.toUploadFile(file));
    }
    if (!added.length) return;
    this.fileList.update((list) => [...list, ...added]);
    this.hbSelect.emit(added);
    if (this.hbAuto()) this.upload();
  }

  private toUploadFile(file: File): HbUploadFile {
    let objectUrl: string | undefined;
    if (this.hbShowPreview() && file.type.startsWith('image/')) {
      objectUrl = URL.createObjectURL(file);
      this.objectUrls.add(objectUrl);
    }
    return {
      id: `hb-upload-${++fileUploadUid}`,
      file,
      name: file.name,
      size: file.size,
      objectUrl,
      status: 'pending',
      progress: 0,
    };
  }

  private uploadViaXhr(f: HbUploadFile): void {
    this.patch(f.id, { status: 'uploading', progress: 0, error: undefined });
    const form = new FormData();
    form.append(this.hbName(), f.file, f.name);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.hbUrl(), true);
    xhr.withCredentials = this.hbWithCredentials();
    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      const progress = clamp(Math.round((event.loaded / event.total) * 100));
      this.setProgress(f.id, progress);
      const current = this.fileList().find((x) => x.id === f.id);
      if (current) this.hbProgress.emit({ file: current, progress });
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        this.setSuccess(f.id);
        this.emitCompleteIfDone(xhr.responseText);
      } else {
        this.setError(f.id, `Upload failed (${xhr.status})`);
        this.emitError('network', f.file, `Upload failed (${xhr.status})`);
      }
    };
    xhr.onerror = () => {
      this.setError(f.id, 'Network error');
      this.emitError('network', f.file, 'Network error');
    };
    xhr.send(form);
  }

  private emitCompleteIfDone(response: string): void {
    if (this.uploading()) return;
    const done = this.fileList().filter((f) => f.status === 'success');
    this.hbComplete.emit({ files: done, response });
  }

  private matchesAccept(file: File): boolean {
    const accept = this.hbAccept().trim();
    if (!accept) return true;
    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return accept
      .split(',')
      .map((token) => token.trim().toLowerCase())
      .filter(Boolean)
      .some((token) => {
        if (token.startsWith('.')) return name.endsWith(token);
        if (token.endsWith('/*')) return type.startsWith(token.slice(0, -1));
        return type === token;
      });
  }

  private emitError(reason: HbUploadErrorReason, file: File, message: string): void {
    this.hbUploadError.emit({ reason, file, message });
  }

  private clearInternal(emit: boolean): void {
    this.revokeAll();
    this.fileList.set([]);
    if (emit) this.hbClear.emit();
  }

  private patch(id: string, changes: Partial<HbUploadFile>): void {
    this.fileList.update((list) => list.map((f) => (f.id === id ? { ...f, ...changes } : f)));
  }

  private revoke(url: string): void {
    URL.revokeObjectURL(url);
    this.objectUrls.delete(url);
  }
  private revokeAll(): void {
    this.objectUrls.forEach((url) => URL.revokeObjectURL(url));
    this.objectUrls.clear();
  }
}

