import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HbButtonComponent } from '@herbst/ui';

import { TranslatePipe } from '../t.pipe';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, HbButtonComponent, TranslatePipe],
  template: `
    <div
      class="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center text-foreground"
    >
      <p class="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">404</p>
      <h1 class="font-display text-[clamp(28px,4vw,40px)] font-semibold italic tracking-tight">
        {{ 'notfound.title' | t }}
      </h1>
      <p class="max-w-[40ch] text-sm leading-[1.65] text-muted-foreground">
        {{ 'notfound.desc' | t }}
      </p>
      <a hb-button routerLink="/" class="mt-2 h-10 px-6">{{ 'notfound.back' | t }}</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
