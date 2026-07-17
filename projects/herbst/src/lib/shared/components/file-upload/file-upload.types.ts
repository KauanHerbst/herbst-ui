export type HbFileUploadMode = 'advanced' | 'basic';
export type HbUploadStatus = 'pending' | 'uploading' | 'success' | 'error';

export interface HbUploadFile {
  readonly id: string;
  readonly file: File;
  readonly name: string;
  readonly size: number;
  readonly objectUrl?: string;
  status: HbUploadStatus;
  progress: number;
  error?: string;
}

export type HbUploadErrorReason = 'accept' | 'max-file-size' | 'file-limit' | 'network';

export interface HbUploadError {
  readonly reason: HbUploadErrorReason;
  readonly file?: File;
  readonly message: string;
}

export interface HbUploadEvent {
  readonly files: File[];
}

export interface HbUploadProgress {
  readonly file: HbUploadFile;
  readonly progress: number;
}

export interface HbUploadComplete {
  readonly files: HbUploadFile[];
  readonly response?: unknown;
}

export interface HbFileUploadHeaderContext {
  readonly files: readonly HbUploadFile[];
  readonly uploading: boolean;
  choose(): void;
  upload(): void;
  clear(): void;
}

export interface HbFileUploadFileContext {
  readonly $implicit: HbUploadFile;
  remove(): void;
}
