import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { Comment, CommentDto, CommentList } from 'app/domain';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private readonly _httpClient = inject(HttpClient);
  private _api: string = environment.BACKEND_API + '/comments/';

  constructor() {}

  fetchComments(params?: {
    object_id: number;
    content_type: number;
    user?: number;
  }): Observable<CommentList> {
    return this._httpClient.get<CommentList>(this._api, { params });
  }

  saveComment(comment: CommentDto): Observable<Comment> {
    return this._httpClient.post<Comment>(this._api, comment);
  }

  deleteComment(id: number): Observable<Comment> {
    return this._httpClient.delete<Comment>(`${this._api}${id}/`);
  }
}
