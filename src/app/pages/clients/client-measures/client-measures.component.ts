import { Component, inject, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Location } from '@angular/common';

import { Measure, User } from 'app/domain';
import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';
import { UserService } from 'app/core/services';

import { ChartModule } from 'primeng/chart';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ActivatedRoute, RouterLink } from '@angular/router';

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
  selector: 'app-client-measures',
  standalone: true,
  imports: [
    DatePipe,
    ChartModule,
    RouterLink,
    NgIcon,
    AsyncPipe,
    SkeletonComponent,
  ],
  providers: [
    DialogService,
    provideIcons({
      faSolidChevronRight,
    }),
  ],
  templateUrl: './client-measures.component.html',
  styleUrl: './client-measures.component.scss',
})
export class ClientMeasuresComponent implements OnInit {
  private readonly _route = inject(ActivatedRoute);
  private readonly _location = inject(Location);

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
    const cliendId = this._route.snapshot.paramMap.get('id');

    if (cliendId) {
      this.getMeasures(Number(cliendId));
    }
  }

  getMeasures(clientId: number) {
    this.measures$ = this._userService.measures(clientId).pipe(
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
    // this.ref = this._dialogService.open(MeasureComponent, {
    //   header: '',
    //   maximizable: true,
    //   appendTo: 'body',
    //   closable: true,
    //   data: {
    //     measureId: measureId,
    //   },
    // });
    // this._dialogService.getInstance(this.ref).maximize();
  }

  goBack() {
    this._location.back();
  }
}
