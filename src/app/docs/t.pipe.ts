import { inject, Pipe, type PipeTransform } from '@angular/core';

import { LocaleService } from './locale.service';

@Pipe({ name: 't', pure: false })
export class TranslatePipe implements PipeTransform {
  private readonly locale = inject(LocaleService);

  transform(key: string): string {
    return this.locale.t(key);
  }
}
