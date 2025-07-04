import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Routine } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/routines/';

  get(id: number): Observable<Routine> {
    return this._httpClient.get<Routine>(`${this._api}${id}/`);
  }
}
