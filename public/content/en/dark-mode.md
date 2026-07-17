# Dark mode

Dark mode is autumn at dusk — Herbst's **Dusk** theme. The same October wood as the light falls: a warm charcoal, never pure black, the last leaves catching a low glow under a late-afternoon sky. It's driven by a single `.dark` class on the root element.

## How it works

Every token is defined twice — once for light, once under `.dark`. Toggle one class on `<html>` and the whole catalogue turns to Dusk.

```css
.dark {
  --background: oklch(0.185 0.008 70);
  --primary: oklch(0.620 0.155 45);
}
```

Because components read the tokens, nothing else changes — the season shifts from day to dusk all at once.

## Toggle

Drop this in anywhere. It flips the class and remembers the choice.

```ts
import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  template: `<button type="button" (click)="toggle()">{{ dark() ? 'Day' : 'Dusk' }}</button>`,
})
export class ThemeToggle {
  private readonly document = inject(DOCUMENT);
  protected readonly dark = signal(this.document.documentElement.classList.contains('dark'));

  protected toggle(): void {
    this.dark.update((value) => !value);
    this.document.documentElement.classList.toggle('dark', this.dark());
    localStorage.setItem('theme', this.dark() ? 'dark' : 'light');
  }
}
```
