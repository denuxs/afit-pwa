import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe, AsyncPipe } from '@angular/common';
import { Location } from '@angular/common';

import { Measure } from 'app/domain';
import { MeasuresService } from 'app/services/measures.service';

import { ImageModule } from 'primeng/image';

import { UploadImageComponent } from 'app/components/upload-image/upload-image.component';
import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-measure',
  standalone: true,
  imports: [
    DatePipe,
    AsyncPipe,
    ImageModule,
    UploadImageComponent,
    SkeletonComponent,
  ],
  templateUrl: './measure.component.html',
  styleUrl: './measure.component.scss',
})
export class MeasureComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _location = inject(Location);

  private readonly _measureService = inject(MeasuresService);

  measure$!: Observable<Measure>;

  contentType = 18;
  objectId = 0;

  ngOnInit(): void {
    const measureId = this._route.snapshot.paramMap.get('id');

    if (measureId) {
      this.objectId = Number(measureId);
      this.measure$ = this._measureService.get(Number(measureId));
    }
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy(): void {}
}
