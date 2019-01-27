import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../shared';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  constructor(private _http: HttpClient) {}

  getPlayer(id: number): Observable<Player[]> {
    let params = new HttpParams();
    ids.forEach((id, i) => params = params.append('id', id.toString()));

    return this._http.get<Player[]>(`${BACKEND_URL}/player`, { params: params })
    .pipe(map((data: Player[]) => {
      data.forEach((element: Player) => element.fullName = `${element.firstName} ${element.lastName}`);
      return data;
    }));
  }
}
