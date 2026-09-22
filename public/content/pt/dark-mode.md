# Modo escuro

O tema escuro do Herbst se chama **Dusk**, o fim de tarde do outono. O fundo é um carvão quente, nunca preto puro, e o laranja de destaque continua o mesmo. Tudo é controlado por uma classe `.dark` no elemento raiz.

## Como funciona

Cada token tem dois valores: um para o tema claro e outro dentro de `.dark`. Coloque a classe no `<html>` e todos os componentes mudam para o Dusk.

```css
.dark {
  --background: oklch(0.185 0.008 70);
  --primary: oklch(0.620 0.155 45);
}
```

Os componentes leem esses tokens, então você não precisa mudar mais nada.

## Toggle

Este botão liga e desliga a classe e guarda a escolha no `localStorage`.

```ts
import { DOCUMENT } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  template: `<button type="button" (click)="toggle()">{{ dark() ? 'Dia' : 'Dusk' }}</button>`,
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
