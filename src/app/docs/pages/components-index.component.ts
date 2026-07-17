import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { HbCardImports } from '@herbst/ui';

import { COMPONENT_NAMES, titleFromSlug } from '../docs-nav';
import { LocaleService } from '../locale.service';
import { TranslatePipe } from '../t.pipe';

@Component({
  selector: 'app-components-index',
  imports: [RouterLink, HbCardImports, TranslatePipe],
  template: `
    <div class="mb-10">
      <p
        class="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
      >
        {{ 'index.eyebrow' | t }}
      </p>
      <h1 class="mt-3 font-display text-4xl font-semibold italic tracking-[-0.01em]">
        {{ 'index.title' | t }}
      </h1>
      <p class="mt-3 max-w-[54ch] text-[15px] leading-[1.7] text-foreground">
        {{ 'index.desc' | t }}
      </p>
    </div>

    <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2">
      @for (name of names; track name; let i = $index) {
        <li>
          <a
            hb-card
            hbSize="sm"
            [routerLink]="loc.docsLink('components', name)"
            class="transition-colors hover:border-primary/40 hover:bg-accent/40"
          >
            <hb-card-content>
              <p
                class="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-muted-foreground"
              >
                <span class="text-primary">HB·{{ pad(i + 1) }}</span>
              </p>
              <p class="mt-1 font-display text-lg font-semibold tracking-[-0.01em]">
                {{ title(name) }}
              </p>
            </hb-card-content>
          </a>
        </li>
      }
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsIndexComponent {
  protected readonly loc = inject(LocaleService);
  protected readonly names = COMPONENT_NAMES;
  protected readonly title = titleFromSlug;

  protected pad(value: number): string {
    return String(value).padStart(3, '0');
  }
}
