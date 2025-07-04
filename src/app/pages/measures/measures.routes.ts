import { Routes } from '@angular/router';

import { MeasuresComponent } from './measures.component';
import { MeasureComponent } from './measure/measure.component';

export default [
  {
    path: '',
    component: MeasuresComponent,
  },
  {
    path: ':id',
    component: MeasureComponent,
  },
] as Routes;
