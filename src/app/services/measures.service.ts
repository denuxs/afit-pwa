import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Measure, MeasureList } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class MeasuresService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/measures/';

  constructor() {}

  fetchMeasures(params?: any): Observable<MeasureList> {
    return this._httpClient.get<MeasureList>(this._api, { params });
  }

  showMeasure(id: number): Observable<Measure> {
    return this._httpClient.get<Measure>(this._api + `${id}/`);
  }
}
