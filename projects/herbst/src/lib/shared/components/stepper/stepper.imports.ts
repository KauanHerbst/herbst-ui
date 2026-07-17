import { HbStepContentDirective } from './step-content.directive';
import { HbStepComponent } from './step.component';
import { HbStepperComponent } from './stepper.component';

export const HbStepperImports = [
  HbStepperComponent,
  HbStepComponent,
  HbStepContentDirective,
] as const;
