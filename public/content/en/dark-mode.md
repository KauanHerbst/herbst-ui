# Dark mode

Herbst's dark theme is called **Dusk**, the late afternoon of autumn. The background is a warm charcoal, never pure black, and the orange accent stays the same. Everything is controlled by a `.dark` class on the root element.

## How it works

Each token has two values: one for the light theme and one inside `.dark`. Add the class to `<html>` and every component switches to Dusk.

```css
.dark {
  --background: oklch(0.185 0.008 70);
  --primary: oklch(0.620 0.155 45);
}
```

Components read these tokens, so you don't need to change anything else.

## Toggle

This button turns the class on and off and saves the choice in `localStorage`.

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
