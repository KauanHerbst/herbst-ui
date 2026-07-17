import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, TitleStrategy, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { DocsTitleStrategy } from './docs/docs-title.strategy';

import { provideIcons } from '@ng-icons/core';
import {
  phosphorArrowRight,
  phosphorList,
  phosphorCheck,
  phosphorX,
  phosphorTextB,
  phosphorTextItalic,
  phosphorTextUnderline,
  phosphorTextAlignLeft,
  phosphorTextAlignCenter,
  phosphorTextAlignRight,
  phosphorFolder,
  phosphorFile,
  phosphorFileTs,
  phosphorFileHtml,
  phosphorFileCss,
  phosphorHeart,
  phosphorMagnifyingGlass,
  phosphorMoon,
  phosphorPlus,
  phosphorSun,
  phosphorTrash,
  phosphorDownloadSimple,
  phosphorFilePdf,
  phosphorImage,
  phosphorLock,
  phosphorBell,
  phosphorSpinnerGap,
  phosphorCaretRight,
  phosphorCaretDown,
  phosphorGithubLogo,
  phosphorInstagramLogo,
} from '@ng-icons/phosphor-icons/regular';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    { provide: TitleStrategy, useClass: DocsTitleStrategy },
    provideHttpClient(withFetch()),
    provideCharts(withDefaultRegisterables()),
    provideIcons({
      phosphorArrowRight,
      phosphorList,
      phosphorCheck,
      phosphorX,
      phosphorTextB,
      phosphorTextItalic,
      phosphorTextUnderline,
      phosphorTextAlignLeft,
      phosphorTextAlignCenter,
      phosphorTextAlignRight,
      phosphorFolder,
      phosphorFile,
      phosphorFileTs,
      phosphorFileHtml,
      phosphorFileCss,
      phosphorHeart,
      phosphorMagnifyingGlass,
      phosphorMoon,
      phosphorPlus,
      phosphorSun,
      phosphorTrash,
      phosphorDownloadSimple,
      phosphorFilePdf,
      phosphorImage,
      phosphorLock,
      phosphorBell,
      phosphorSpinnerGap,
      phosphorCaretRight,
      phosphorCaretDown,
      phosphorGithubLogo,
      phosphorInstagramLogo,
    }),
  ],
};
