import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { HbBubbleImports, HbButtonComponent, type HbBubbleReaction } from '@herbst/ui';

@Component({
  selector: 'hb-demo-bubble-reactions',
  imports: [HbBubbleImports, HbButtonComponent],
  template: `
    <div class="flex w-full max-w-md flex-col gap-2">
      <hb-bubble hbVariant="outline">
        New autumn photos ready for review.

        <hb-bubble-reactions
          [hbReactions]="reactions"
          hbAddable
          (hbReact)="last.set('Toggled ' + $event)"
          (hbAdd)="last.set('Add reaction')"
        />

        <hb-bubble-actions>
          <button hb-button hbType="ghost" hbSize="sm">Reply</button>
          <hb-bubble-menu>
            <button hb-button hbType="ghost" hbSize="sm">Copy</button>
            <button hb-button hbType="ghost" hbSize="sm">Delete</button>
          </hb-bubble-menu>
        </hb-bubble-actions>
      </hb-bubble>

      <p class="font-mono text-[12px] text-muted-foreground">{{ last() }}</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HbDemoBubbleReactionsComponent {
  protected readonly reactions: HbBubbleReaction[] = [
    { emoji: '🍂', count: 3, reacted: true },
    { emoji: '🌿', count: 1 },
  ];
  protected readonly last = signal('No reaction yet.');
}
