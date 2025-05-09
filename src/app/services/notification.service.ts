import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Notification, NotificationList } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/notifications/';

  constructor() {}

  search(params?: any): Observable<NotificationList> {
    return this._httpClient.get<NotificationList>(this._api, { params });
  }
}
