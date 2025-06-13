import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Client, Workout } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/clients/';

  constructor() {}

  all(params?: any): Observable<Client[]> {
    return this._httpClient.get<Client[]>(this._api, { params });
  }

  get(id: number): Observable<Client> {
    return this._httpClient.get<Client>(this._api + `${id}/`);
  }

  workouts(): Observable<Workout[]> {
    return this._httpClient.get<Workout[]>(this._api + 'workouts/');
  }
}
