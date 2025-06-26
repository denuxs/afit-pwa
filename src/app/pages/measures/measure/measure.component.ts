import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe, AsyncPipe } from '@angular/common';

import { Measure } from 'app/domain';
import { MeasuresService } from 'app/services/measures.service';

import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

import { UploadImageComponent } from 'app/components/upload-image/upload-image.component';
import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';

@Component({
  selector: 'app-measure',
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    ImageModule,
    ConfirmDialogModule,
    UploadImageComponent,
    SkeletonComponent,
  ],
  templateUrl: './measure.component.html',
  styleUrl: './measure.component.scss',
})
export class MeasureComponent implements OnInit {
  private readonly _config = inject(DynamicDialogConfig);
  private readonly _ref = inject(DynamicDialogRef);

  private readonly _measureService = inject(MeasuresService);

  measure$!: Observable<Measure>;

  contentType = 18;
  objectId = 0;

  ngOnInit(): void {
    const config = this._config.data;
    const { measureId } = config;

    if (measureId) {
      this.objectId = Number(measureId);
      this.measure$ = this._measureService.get(Number(measureId));
    }
  }

  ngOnDestroy(): void {
    if (this._ref) {
      this._ref.close();
    }
  }
}
