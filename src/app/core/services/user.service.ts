import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, ReplaySubject, tap, throwError } from 'rxjs';

import { environment } from 'environments/environment';
import { User, Workout } from 'app/domain';

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
    return this._httpClient.get<User>(this._api + 'me/').pipe(
      tap((user) => {
        this._user.next(user);
      }),
    );
  }

  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(this._api);
  }

  getUser(userId: number): Observable<User> {
    return this._httpClient.get<User>(this._api + `${userId}/`);
  }

  getWorkouts(): Observable<Workout[]> {
    return this._httpClient.get<Workout[]>(this._api + 'workouts/');
  }

  updateUser(id: number, form: FormData): Observable<User> {
    return this._httpClient.patch<User>(this._api + `${id}/`, form);
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

  savePhoto(id: number, form: FormData): Observable<User> {
    return this._httpClient.patch<User>(this._api + `${id}/`, form);
  }
}
