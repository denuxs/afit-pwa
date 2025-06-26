import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { RoutineExercise } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class RoutineExerciseService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/routineexercises/';

  get(id: number): Observable<RoutineExercise> {
    return this._httpClient.get<RoutineExercise>(`${this._api}${id}/`);
  }
}
