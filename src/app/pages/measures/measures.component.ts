import { Component, inject, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';

import { Measure, User } from 'app/domain';
import { MeasuresService } from 'app/services';
import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';
import { UserService } from 'app/core/services';

import { ChartModule } from 'primeng/chart';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { MeasureComponent } from './measure/measure.component';
import { RouterLink } from '@angular/router';

import { NgIcon, provideIcons } from '@ng-icons/core';
import { faSolidChevronRight } from '@ng-icons/font-awesome/solid';

interface LineChartDataset {
  label: string;
  data: number[];
  fill?: boolean;
  tension?: number;
}
interface LineChart {
  labels: string[];
  datasets: LineChartDataset[];
}

@Component({
  selector: 'app-measures',
  standalone: true,
  imports: [
    DatePipe,
    ChartModule,
    NgIcon,
    RouterLink,
    AsyncPipe,
    SkeletonComponent,
  ],
  providers: [
    DialogService,
    provideIcons({
      faSolidChevronRight,
    }),
  ],
  templateUrl: './measures.component.html',
  styleUrl: './measures.component.scss',
})
export class MeasuresComponent implements OnInit {
  private readonly _dialogService = inject(DialogService);

  private readonly _measureService = inject(MeasuresService);
  private readonly _userService = inject(UserService);

  ref: DynamicDialogRef | undefined;

  measures$!: Observable<Measure[]>;

  dataChart: LineChart = {
    labels: [],
    datasets: [
      {
        label: 'Peso',
        data: [],
        fill: false,
        tension: 0.4,
      },
    ],
  };

  optionsChart = {
    maintainAspectRatio: false,
    aspectRatio: 2,
  };

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this._userService.user$.subscribe((user: User) => {
      this.getMeasure(user.id);
    });
  }

  getMeasure(userId: number) {
    const params: any = {
      user: userId,
      is_active: true,
      ordering: '-id',
      paginator: null,
    };

    this.measures$ = this._measureService.all(params).pipe(
      switchMap((measures: Measure[]) => {
        this.setLineChart(measures);
        return of(measures);
      }),
    );
  }

  setLineChart(measures: Measure[]) {
    const data: number[] = measures.map((item) => {
      const { measures } = item;
      return measures.weight;
    });
    data.reverse();

    const labels: string[] = measures.map((item) => {
      return format(new Date(item.created), 'dd-LLLL', { locale: es });
    });
    labels.reverse();

    this.dataChart = {
      labels: labels,
      datasets: [
        {
          label: 'Peso',
          data: data,
          fill: false,
          tension: 0.4,
        },
      ],
    };
  }

  openMeasureModal(measureId: number) {
    this.ref = this._dialogService.open(MeasureComponent, {
      header: '',
      maximizable: true,
      appendTo: 'body',
      closable: true,
      data: {
        measureId: measureId,
      },
    });

    this._dialogService.getInstance(this.ref).maximize();
  }
}
