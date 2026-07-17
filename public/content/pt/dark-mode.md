# Modo escuro

O modo escuro é o outono ao entardecer — o tema **Dusk** do Herbst. O mesmo bosque de outubro quando a luz cai: um carvão quente, nunca preto puro, com as últimas folhas ganhando um brilho baixo sob o céu de fim de tarde. É controlado por uma única classe `.dark` no elemento raiz.

## Como funciona

Cada token é definido duas vezes — uma para o claro, outra sob `.dark`. Alterne uma classe no `<html>` e o catálogo inteiro vira Dusk.

```css
.dark {
  --background: oklch(0.185 0.008 70);
  --primary: oklch(0.620 0.155 45);
}
```

Como os componentes leem os tokens, nada mais muda — a estação passa do dia ao entardecer de uma vez só.

## Toggle

Coloque isto em qualquer lugar. Ele inverte a classe e lembra a escolha.

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
