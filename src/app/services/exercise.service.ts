import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Exercise, ExerciseList } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/exercises/';

  constructor() {}

  fetchExercises(): Observable<ExerciseList> {
    return this._httpClient.get<ExerciseList>(this._api);
  }

  showExercise(id: number): Observable<Exercise> {
    return this._httpClient.get<Exercise>(this._api + `${id}/`);
  }
}
