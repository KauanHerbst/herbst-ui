import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  HbTabsImports,
  type HbTabsAlign,
  type HbTabsPosition,
  type HbTabsSize,
  type HbTabsVariant,
} from '@herbst/ui';

@Component({
  selector: 'hb-demo-tabs-appearance',
  imports: [HbTabsImports],
  template: `
    <div class="flex w-full flex-col gap-4">
      <div class="flex flex-wrap gap-2 font-mono text-xs">
        <select
          class="rounded-md border border-border bg-background px-2 py-1"
          #v
          (change)="variant.set($any(v.value))"
        >
          <option value="line">line</option>
          <option value="pills">pills</option>
          <option value="underline">underline</option>
        </select>
        <select
          class="rounded-md border border-border bg-background px-2 py-1"
          #s
          (change)="size.set($any(s.value))"
        >
          <option value="xs">xs</option>
          <option value="sm">sm</option>
          <option value="md" selected>md</option>
          <option value="lg">lg</option>
          <option value="xl">xl</option>
        </select>
        <select
          class="rounded-md border border-border bg-background px-2 py-1"
          #p
          (change)="position.set($any(p.value))"
        >
          <option value="top">top</option>
          <option value="bottom">bottom</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
        <select
          class="rounded-md border border-border bg-background px-2 py-1"
          #a
          (change)="align.set($any(a.value))"
        >
          <option value="start">start</option>
          <option value="center">center</option>
          <option value="end">end</option>
          <option value="stretch">stretch</option>
        </select>
      </div>

      <hb-tabs
        class="w-full"
        [hbVariant]="variant()"
        [hbSize]="size()"
        [hbPosition]="position()"
        [hbAlign]="align()"
        hbValue="walk"
      >
        <hb-tab-list>
          <hb-tab hbValue="walk">Walk</hb-tab>
          <hb-tab hbValue="edit">Edit</hb-tab>
          <hb-tab hbValue="share">Share</hb-tab>
        </hb-tab-list>

        <hb-tab-panel hbValue="walk">
          <p class="text-sm text-muted-foreground">Wander the forest as the leaves fall.</p>
        </hb-tab-panel>
        <hb-tab-panel hbValue="edit">
          <p class="text-sm text-muted-foreground">Pick the best shots and crop them.</p>
        </hb-tab-panel>
        <hb-tab-panel hbValue="share">
          <p class="text-sm text-muted-foreground">Add a caption and share to Herbst.</p>
        </hb-tab-panel>
      </hb-tabs>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoTabsAppearanceComponent {
  protected readonly variant = signal<HbTabsVariant>('line');
  protected readonly size = signal<HbTabsSize>('md');
  protected readonly position = signal<HbTabsPosition>('top');
  protected readonly align = signal<HbTabsAlign>('start');
}
