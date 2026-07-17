import { HbTimelineConnectorComponent } from './timeline-connector.component';
import { HbTimelineContentComponent } from './timeline-content.component';
import { HbTimelineItemComponent } from './timeline-item.component';
import { HbTimelineMarkerComponent } from './timeline-marker.component';
import { HbTimelineOppositeComponent } from './timeline-opposite.component';
import { HbTimelineComponent } from './timeline.component';

export const HbTimelineImports = [
  HbTimelineComponent,
  HbTimelineItemComponent,
  HbTimelineMarkerComponent,
  HbTimelineContentComponent,
  HbTimelineOppositeComponent,
  HbTimelineConnectorComponent,
] as const;
