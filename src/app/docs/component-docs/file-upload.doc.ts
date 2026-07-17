import {
  HbDemoFileUploadAdvancedComponent,
  HbDemoFileUploadBasicComponent,
  HbDemoFileUploadConstraintsComponent,
} from '../demos/file-upload';
import * as advancedSource from '../demos/file-upload/file-upload-advanced' with { loader: 'text' };
import * as basicSource from '../demos/file-upload/file-upload-basic' with { loader: 'text' };
import * as constraintsSource from '../demos/file-upload/file-upload-constraints' with { loader: 'text' };

import { sourceText, type ComponentDoc } from './component-doc.types';

export const fileUploadDoc: ComponentDoc = {
  slug: 'file-upload',
  title: 'File upload',
  description: {
    en: 'A drag-and-drop uploader. Choose or drop files, preview them, enforce type, size, and count limits, and optionally upload to an endpoint — in a full dropzone or a compact button.',
    pt: 'Um uploader com arrastar e soltar. Escolha ou solte arquivos, visualize-os, imponha limites de tipo, tamanho e quantidade, e opcionalmente envie a um endpoint — numa dropzone completa ou botão compacto.',
  },
  demos: [
    {
      id: 'advanced',
      title: { en: 'Advanced (dropzone)', pt: 'Avançado (dropzone)' },
      component: HbDemoFileUploadAdvancedComponent,
      source: sourceText(advancedSource),
      align: 'start',
      expanded: true,
    },
    {
      id: 'basic',
      title: { en: 'Basic (compact)', pt: 'Básico (compacto)' },
      component: HbDemoFileUploadBasicComponent,
      source: sourceText(basicSource),
      align: 'start',
    },
    {
      id: 'constraints',
      title: { en: 'Type, size & count limits', pt: 'Limites de tipo, tamanho e quantidade' },
      component: HbDemoFileUploadConstraintsComponent,
      source: sourceText(constraintsSource),
      align: 'start',
    },
  ],
  api: [
    {
      title: 'hb-file-upload — selection',
      rows: [
        {
          property: '[hbMode]',
          description: {
            en: 'Full dropzone, or a compact button.',
            pt: 'Dropzone completa, ou um botão compacto.',
          },
          type: `'advanced' | 'basic'`,
          default: `'advanced'`,
        },
        {
          property: '[hbMultiple]',
          description: {
            en: 'Allow selecting more than one file.',
            pt: 'Permite selecionar mais de um arquivo.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbAccept]',
          description: {
            en: 'Accepted types (an accept string, e.g. "image/*,.pdf").',
            pt: 'Tipos aceitos (uma string accept, ex. "image/*,.pdf").',
          },
          type: 'string',
          default: `''`,
        },
        {
          property: '[hbMaxFileSize] / [hbFileLimit]',
          description: {
            en: 'Max size per file in bytes, and max number of files (0 = no limit).',
            pt: 'Tamanho máximo por arquivo em bytes, e número máximo de arquivos (0 = sem limite).',
          },
          type: 'number',
          default: '0',
        },
        {
          property: '[hbShowPreview] / [hbDisabled]',
          description: {
            en: 'Show file previews, and disable the control.',
            pt: 'Mostra prévias dos arquivos, e desabilita o controle.',
          },
          type: 'boolean',
          default: 'true / false',
        },
        {
          property: 'labels',
          description: {
            en: 'hbChooseLabel, hbUploadLabel, hbClearLabel, hbDropLabel.',
            pt: 'hbChooseLabel, hbUploadLabel, hbClearLabel, hbDropLabel.',
          },
          type: 'string',
          default: `'Choose' / 'Upload' / 'Clear' / …`,
        },
      ],
    },
    {
      title: 'hb-file-upload — uploading',
      rows: [
        {
          property: '[hbAuto]',
          description: {
            en: 'Upload files immediately on selection.',
            pt: 'Envia os arquivos imediatamente ao selecionar.',
          },
          type: 'boolean',
          default: 'false',
        },
        {
          property: '[hbUrl] / [hbName] / [hbWithCredentials]',
          description: {
            en: 'Endpoint, form field name, and whether to send credentials.',
            pt: 'Endpoint, nome do campo de formulário, e se envia credenciais.',
          },
          type: 'string / boolean',
          default: `'' / 'files' / false`,
        },
      ],
    },
    {
      title: 'Outputs & templates',
      rows: [
        {
          property: '(hbSelect) / (hbRemove) / (hbClear)',
          description: {
            en: 'Files chosen, a file removed, and the list cleared.',
            pt: 'Arquivos escolhidos, um arquivo removido, e a lista limpa.',
          },
          type: 'HbUploadFile[] / HbUploadFile / void',
          default: '—',
        },
        {
          property: '(hbUpload) / (hbProgress) / (hbComplete) / (hbUploadError)',
          description: {
            en: 'Upload lifecycle events, including validation and network errors.',
            pt: 'Eventos do ciclo de upload, incluindo erros de validação e de rede.',
          },
          type: 'event objects',
          default: '—',
        },
        {
          property: 'hbUploadHeader / hbUploadFile / hbUploadEmpty',
          description: {
            en: 'ng-template directives to customise the header, each file row, and the empty state.',
            pt: 'Diretivas ng-template para customizar o cabeçalho, cada linha de arquivo e o estado vazio.',
          },
          type: 'template',
          default: '—',
        },
      ],
    },
  ],
};
