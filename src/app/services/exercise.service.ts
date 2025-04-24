import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Exercise, ExerciseDto } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/exercises/';

  constructor() {}

  fetchExercises(): Observable<Exercise[]> {
    return this._httpClient.get<Exercise[]>(this._api);
  }

  showExercise(id: number): Observable<Exercise> {
    return this._httpClient.get<Exercise>(this._api + `${id}/`);
  }

  saveExercise(body: ExerciseDto): Observable<Exercise> {
    return this._httpClient.post<Exercise>(this._api, body);
  }

  updateExercise(id: number, form: ExerciseDto): Observable<Exercise> {
    return this._httpClient.put<Exercise>(this._api + `${id}/`, form);
  }
}
