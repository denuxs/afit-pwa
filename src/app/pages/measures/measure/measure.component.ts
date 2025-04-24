import { Component, inject, OnInit } from '@angular/core';
import { Observable, takeUntil } from 'rxjs';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Measure } from 'app/domain';
import { MeasuresService } from 'app/services/measures.service';

import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { UploadImageComponent } from 'app/components/upload-image/upload-image.component';

@Component({
  selector: 'app-measure',
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    RouterLink,
    ImageModule,
    ConfirmDialogModule,
    UploadImageComponent,
  ],
  templateUrl: './measure.component.html',
  styleUrl: './measure.component.scss',
})
export class MeasureComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _measureService = inject(MeasuresService);

  measure$!: Observable<Measure>;

  translate: any = {
    // weight: 'Peso',
    height: 'Altura',
    chest: 'Pecho',
    abdomen: 'Abdomen',
    back: 'Espalda',
    arm_left: 'Brazo Izquierdo',
    arm_right: 'Brazo Derecho',
    forearm: 'Antebrazo',
    leg_left: 'Pierna Derecha',
    leg_right: 'Pierna Derecha',
    waist: 'Cintura',
    hips: 'Caderas',
    glutes: 'Gluteos',
    biceps: 'Biceps',
  };

  contentType = 15;
  objectId = 0;

  ngOnInit(): void {
    const measureId = this._route.snapshot.paramMap.get('id');
    if (measureId) {
      this.objectId = Number(measureId);
      this.measure$ = this._measureService.showMeasure(Number(measureId));
    }
  }
}
