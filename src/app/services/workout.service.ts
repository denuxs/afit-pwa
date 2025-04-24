import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Workout } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/workouts/';

  constructor() {}

  fetchWorkouts(params: any): Observable<Workout[]> {
    return this._httpClient.get<Workout[]>(this._api, { params });
  }

  showWorkout(id: number): Observable<Workout> {
    return this._httpClient.get<Workout>(`${this._api}${id}/`);
  }
}
