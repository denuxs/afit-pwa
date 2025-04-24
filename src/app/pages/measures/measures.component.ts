import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Measure } from 'app/domain';
import { MeasuresService, UserService } from 'app/services';

import { ChartModule } from 'primeng/chart';

import { format } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-measures',
  standalone: true,
  imports: [DatePipe, ChartModule, RouterLink],
  templateUrl: './measures.component.html',
  styleUrl: './measures.component.scss',
})
export class MeasuresComponent implements OnInit {
  private readonly _measureService = inject(MeasuresService);
  private readonly _userService = inject(UserService);

  measures$!: Observable<Measure[]>;
  measures: Measure[] = [];

  dataChart: any = {
    labels: [],
    datasets: [
      {
        label: 'Peso',
        data: [],
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

      // this.measures$ = this._measureService.fetchMeasures(params);
      this.getMeasures(params);
    });
  }

  getMeasures(params: any) {
    this._measureService.fetchMeasures(params).subscribe({
      next: (measures: Measure[]) => {
        this.measures = measures;

        const data = measures.map((item) => {
          const { measures } = item;
          return measures.weight;
        });
        data.reverse();

        const labels = measures.map((item) => {
          return format(new Date(item.created), 'dd-LLLL', { locale: es });
        });
        labels.reverse();

        this.setLineChart(data, labels);
      },
      error: (err) => {
        console.log('error getting measures');
      },
    });
  }

  setLineChart(data: any, labels: any) {
    this.dataChart.labels = labels;
    this.dataChart.datasets = [
      {
        label: 'Peso',
        data: data,
        fill: false,
        tension: 0.4,
      },
    ];
  }
}
