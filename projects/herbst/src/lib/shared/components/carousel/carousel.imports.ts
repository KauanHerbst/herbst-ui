import { HbCarouselComponent } from './carousel.component';
import { HbCarouselContentComponent } from './carousel-content.component';
import { HbCarouselDotsComponent } from './carousel-dots.component';
import { HbCarouselItemComponent } from './carousel-item.component';
import { HbCarouselNextComponent } from './carousel-next.component';
import { HbCarouselPreviousComponent } from './carousel-previous.component';

export const HbCarouselImports = [
  HbCarouselComponent,
  HbCarouselContentComponent,
  HbCarouselItemComponent,
  HbCarouselPreviousComponent,
  HbCarouselNextComponent,
  HbCarouselDotsComponent,
] as const;
