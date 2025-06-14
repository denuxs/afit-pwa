import { Component, inject, OnInit } from '@angular/core';
import { map, Observable, takeUntil } from 'rxjs';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Measure } from 'app/domain';
import { MeasuresService } from 'app/services/measures.service';

import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { UploadImageComponent } from 'app/components/upload-image/upload-image.component';
import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';

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
    SkeletonComponent,
  ],
  templateUrl: './measure.component.html',
  styleUrl: './measure.component.scss',
})
export class MeasureComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _measureService = inject(MeasuresService);

  measure$!: Observable<Measure>;

  contentType = 18;
  objectId = 0;

  ngOnInit(): void {
    const measureId = this._route.snapshot.paramMap.get('id');
    if (measureId) {
      this.objectId = Number(measureId);
      this.measure$ = this._measureService.showMeasure(Number(measureId));
    }
  }
}
