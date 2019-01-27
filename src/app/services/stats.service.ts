import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../shared';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Streak } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  constructor(private _http: HttpClient) { }

  getStreak(ids: number[]): Observable<Streak> {
    let params = new HttpParams();
    ids.forEach((id, i) => params = params.append(`id${i + 1}`, id.toString()));

    return this._http.get<any>(`${BACKEND_URL}/match`, { params: params })
      .pipe(tap(data => data));
  }
}
