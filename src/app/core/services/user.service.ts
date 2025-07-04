import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, ReplaySubject, tap, throwError } from 'rxjs';

import { environment } from 'environments/environment';
import { Measure, Routine, User, UserRoutine } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/users/';

  private readonly _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  constructor() {}

  set user(value: User) {
    this._user.next(value);
  }

  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  profile(): Observable<User> {
    return this._httpClient
      .get<User>(this._api + 'me/')
      .pipe(catchError(this.handleError))
      .pipe(
        tap((user) => {
          this._user.next(user);
        }),
      );
  }

  all(params?: any): Observable<User[]> {
    return this._httpClient
      .get<User[]>(this._api, { params })
      .pipe(catchError(this.handleError));
  }

  update(id: number, form: FormData): Observable<User> {
    return this._httpClient
      .patch<User>(this._api + `${id}/`, form)
      .pipe(catchError(this.handleError));
  }

  routines(clientId: number): Observable<UserRoutine[]> {
    return this._httpClient
      .get<UserRoutine[]>(this._api + `${clientId}/routines/`)
      .pipe(catchError(this.handleError));
  }

  measures(clientId: number): Observable<Measure[]> {
    return this._httpClient
      .get<Measure[]>(this._api + `${clientId}/measures/`)
      .pipe(catchError(this.handleError));
  }

  saveFirebaseToken(form: {
    token: string;
    user: number;
    device: string;
  }): Observable<User> {
    return this._httpClient.post<User>(
      environment.BACKEND_API + '/fcmtokens/',
      form,
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => new Error('An error occurred while fetching data.'),
    );
  }
}
