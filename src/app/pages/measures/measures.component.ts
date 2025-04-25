import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Measure } from 'app/domain';
import { MeasuresService, UserService } from 'app/services';
import { SkeletonComponent } from 'app/components/skeleton/skeleton.component';

import { ChartModule } from 'primeng/chart';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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
  imports: [DatePipe, ChartModule, AsyncPipe, SkeletonComponent, RouterLink],
  templateUrl: './measures.component.html',
  styleUrl: './measures.component.scss',
})
export class MeasuresComponent implements OnInit {
  private readonly _measureService = inject(MeasuresService);
  private readonly _userService = inject(UserService);

  measures$!: Observable<Measure[]>;
  measures: Measure[] = [];

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
    this._userService.user$.subscribe((user) => {
      const params: any = {
        user: user.id,
        is_active: true,
        ordering: '-id',
      };

      this.measures$ = this._measureService.fetchMeasures(params);
    });
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

    const chart: LineChart = {
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

    return chart;
  }
}
