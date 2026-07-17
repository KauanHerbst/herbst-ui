import { Component, signal, viewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { beforeEach, describe, expect, it } from 'vitest';

import { HbFileUploadComponent } from './file-upload.component';
import { HbFileUploadImports } from './file-upload.imports';
import type { HbFileUploadMode, HbUploadError, HbUploadFile } from './file-upload.types';

@Component({
  imports: [HbFileUploadImports],
  template: `
    <hb-file-upload
      [hbMode]="mode()"
      [hbMultiple]="multiple()"
      [hbAccept]="accept()"
      [hbMaxFileSize]="maxSize()"
      (hbSelect)="selected = $event"
      (hbRemove)="removed = $event"
      (hbClear)="cleared = true"
      (hbUpload)="uploadFiles = $event.files"
      (hbUploadError)="errors.push($event)"
    />
  `,
})
class Host {
  readonly upload = viewChild.required(HbFileUploadComponent);
  readonly mode = signal<HbFileUploadMode>('advanced');
  readonly multiple = signal(false);
  readonly accept = signal('');
  readonly maxSize = signal(0);
  selected: HbUploadFile[] | null = null;
  removed: HbUploadFile | null = null;
  cleared = false;
  uploadFiles: File[] | null = null;
  errors: HbUploadError[] = [];
}

function makeFile(name: string, type: string, size = 4): File {
  return new File(['x'.repeat(size)], name, { type });
}

function render() {
  TestBed.configureTestingModule({ imports: [Host] });
  const fixture = TestBed.createComponent(Host);
  fixture.detectChanges();
  const el = (sel: string) => fixture.debugElement.query(By.css(sel))?.nativeElement as HTMLElement;
  const all = (sel: string) =>
    fixture.debugElement.queryAll(By.css(sel)).map((d) => d.nativeElement as HTMLElement);
  const select = (files: File[]) => {
    const input = el('[data-slot="file-upload-input"]') as HTMLInputElement;
    Object.defineProperty(input, 'files', { value: files, configurable: true });
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
  };
  return { fixture, host: fixture.componentInstance, el, all, select };
}

describe('HbFileUploadComponent', () => {
  beforeEach(() => {
    (URL as unknown as { createObjectURL: () => string }).createObjectURL = () => 'blob:mock';
    (URL as unknown as { revokeObjectURL: () => void }).revokeObjectURL = () => {};
  });

  it('renders the toolbar and empty dropzone in advanced mode', () => {
    const { el } = render();
    expect(el('[data-slot="file-upload-toolbar"]')).toBeTruthy();
    expect(el('[data-slot="file-upload-dropzone"]')).toBeTruthy();
    expect(el('[data-slot="file-upload-list"]')).toBeFalsy();
  });

  it('renders only the choose button in basic mode', () => {
    const { fixture, el } = render();
    fixture.componentInstance.mode.set('basic');
    fixture.detectChanges();
    expect(el('[data-slot="file-upload-dropzone"]')).toBeFalsy();
    expect(el('button')).toBeTruthy();
  });

  it('adds a selected file to the list and emits hbSelect', () => {
    const { host, all, select } = render();
    select([makeFile('a.txt', 'text/plain')]);
    expect(all('[data-slot="file-upload-item"]').length).toBe(1);
    expect(all('[data-slot="file-upload-item"]')[0].textContent).toContain('a.txt');
    expect(host.selected?.length).toBe(1);
  });

  it('replaces the previous file when not multiple', () => {
    const { host, all, select } = render();
    select([makeFile('a.txt', 'text/plain')]);
    select([makeFile('b.txt', 'text/plain')]);
    expect(all('[data-slot="file-upload-item"]').length).toBe(1);
    expect(host.upload().files()[0].name).toBe('b.txt');
  });

  it('keeps multiple files when hbMultiple is set', () => {
    const { fixture, all, select } = render();
    fixture.componentInstance.multiple.set(true);
    fixture.detectChanges();
    select([makeFile('a.txt', 'text/plain'), makeFile('b.txt', 'text/plain')]);
    expect(all('[data-slot="file-upload-item"]').length).toBe(2);
  });

  it('rejects files above hbMaxFileSize and emits hbUploadError', () => {
    const { fixture, host, all, select } = render();
    fixture.componentInstance.maxSize.set(2);
    fixture.detectChanges();
    select([makeFile('big.txt', 'text/plain', 10)]);
    expect(all('[data-slot="file-upload-item"]').length).toBe(0);
    expect(host.errors.at(-1)?.reason).toBe('max-file-size');
  });

  it('rejects files not matching hbAccept', () => {
    const { fixture, host, all, select } = render();
    fixture.componentInstance.accept.set('image/*');
    fixture.detectChanges();
    select([makeFile('note.txt', 'text/plain')]);
    expect(all('[data-slot="file-upload-item"]').length).toBe(0);
    expect(host.errors.at(-1)?.reason).toBe('accept');
  });

  it('renders an image preview for image files', () => {
    const { fixture, select } = render();
    fixture.componentInstance.accept.set('image/*');
    fixture.detectChanges();
    select([makeFile('pic.png', 'image/png')]);
    const preview = fixture.debugElement.query(By.css('[data-slot="file-upload-preview"]'));
    expect(preview).toBeTruthy();
    expect((preview.nativeElement as HTMLImageElement).getAttribute('src')).toBe('blob:mock');
  });

  it('removes and clears files with events', () => {
    const { fixture, host, all, select } = render();
    select([makeFile('a.txt', 'text/plain')]);
    host.upload().remove(host.upload().files()[0]);
    expect(host.removed?.name).toBe('a.txt');
    select([makeFile('b.txt', 'text/plain')]);
    host.upload().clear();
    fixture.detectChanges();
    expect(host.cleared).toBe(true);
    expect(all('[data-slot="file-upload-item"]').length).toBe(0);
  });

  it('delegates upload and reflects the imperative status API', () => {
    const { fixture, host, el, select } = render();
    select([makeFile('a.txt', 'text/plain')]);
    host.upload().upload();
    fixture.detectChanges();
    expect(host.uploadFiles?.length).toBe(1);
    expect(el('[data-slot="file-upload-item"]').getAttribute('data-status')).toBe('uploading');

    const id = host.upload().files()[0].id;
    host.upload().setSuccess(id);
    fixture.detectChanges();
    expect(el('[data-slot="file-upload-item"]').getAttribute('data-status')).toBe('success');

    host.upload().setError(id, 'boom');
    fixture.detectChanges();
    expect(el('[data-slot="file-upload-item"]').getAttribute('data-status')).toBe('error');
    expect(el('[data-slot="file-upload-item"]').textContent).toContain('boom');
  });
});
