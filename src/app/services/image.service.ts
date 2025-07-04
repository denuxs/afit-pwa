import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Image } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/images/';

  constructor() {}

  all(params?: {
    object_id: number;
    content_type: number;
    paginator?: any;
  }): Observable<Image[]> {
    return this._httpClient.get<Image[]>(this._api, { params });
  }

  create(form: FormData): Observable<Image> {
    return this._httpClient.post<Image>(this._api, form);
  }

  delete(id: number): Observable<Image> {
    return this._httpClient.delete<Image>(this._api + `${id}/`);
  }
}
