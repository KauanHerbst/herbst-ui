import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HbCardImports } from '@herbst/ui';

import { DocsPagerComponent } from '../docs-pager.component';
import { TranslatePipe } from '../t.pipe';

interface ColorSwatch {
  name: string;
  token: string;
  oklch: string;
  hex: string;
}

interface ColorGroup {
  key: string;
  colors: ColorSwatch[];
}

@Component({
  selector: 'app-colors-page',
  imports: [HbCardImports, TranslatePipe, DocsPagerComponent],
  template: `
    <div class="mb-10">
      <p
        class="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground"
      >
        {{ 'colors.eyebrow' | t }}
      </p>
      <h1 class="mt-3 font-display text-4xl font-semibold italic tracking-[-0.01em]">
        {{ 'colors.title' | t }}
      </h1>
      <p class="mt-3 max-w-[54ch] text-[15px] leading-[1.7] text-foreground">
        {{ 'colors.desc' | t }}
      </p>
    </div>

    @for (group of groups; track group.key) {
      <section class="mb-10">
        <h2 class="mb-4 font-display text-2xl font-semibold tracking-tight">{{ group.key | t }}</h2>
        <ul class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          @for (color of group.colors; track color.token) {
            <li>
              <hb-card hbSize="sm">
                <hb-card-content class="flex items-center gap-4">
                  <span
                    class="size-14 shrink-0 rounded-md border border-border"
                    [style.background]="'var(' + color.token + ')'"
                  ></span>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center justify-between gap-2">
                      <span class="font-medium">{{ color.name }}</span>
                      <span class="font-mono text-[12px] text-primary">{{ color.token }}</span>
                    </div>
                    <div
                      class="mt-0.5 flex items-center justify-between gap-2 font-mono text-[12px] text-muted-foreground"
                    >
                      <span>{{ color.oklch }}</span>
                      <span>{{ color.hex }}</span>
                    </div>
                  </div>
                </hb-card-content>
              </hb-card>
            </li>
          }
        </ul>
      </section>
    }

    <app-docs-pager slug="colors" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsPageComponent {
  protected readonly groups: ColorGroup[] = [
    {
      key: 'colors.group.surfaces',
      colors: [
        {
          name: 'Aged Paper',
          token: '--background',
          oklch: 'oklch(0.973 0.005 95)',
          hex: '#F7F5F0',
        },
        { name: 'Fresh Mount', token: '--card', oklch: 'oklch(0.992 0.003 100)', hex: '#FCFBF9' },
        { name: 'Fog', token: '--muted', oklch: 'oklch(0.955 0.006 95)', hex: '#F0EDE7' },
        {
          name: 'Sepia Ink',
          token: '--foreground',
          oklch: 'oklch(0.235 0.013 68)',
          hex: '#2B2620',
        },
        {
          name: 'Faded Label',
          token: '--muted-foreground',
          oklch: 'oklch(0.525 0.012 72)',
          hex: '#7A736A',
        },
        { name: 'Hairline', token: '--border', oklch: 'oklch(0.905 0.008 88)', hex: '#E3DFD8' },
      ],
    },
    {
      key: 'colors.group.accent',
      colors: [
        { name: 'Iron Oxide', token: '--primary', oklch: 'oklch(0.545 0.155 42)', hex: '#A64B2A' },
        { name: 'Pressed', token: '--accent', oklch: 'oklch(0.945 0.018 62)', hex: '#EFE7DC' },
      ],
    },
    {
      key: 'colors.group.status',
      colors: [
        { name: 'Oxblood', token: '--destructive', oklch: 'oklch(0.475 0.145 28)', hex: '#8F3A2E' },
        { name: 'Lichen', token: '--success', oklch: 'oklch(0.520 0.062 138)', hex: '#6B7A55' },
        { name: 'Birch Amber', token: '--warning', oklch: 'oklch(0.720 0.125 76)', hex: '#C79A4E' },
      ],
    },
  ];
}
