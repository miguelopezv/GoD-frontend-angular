import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../shared';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Player } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  constructor(private _http: HttpClient) {}

  /**
   * Retrieves an existing player from DB
   * @param player the player to retrieve
   */
  getPlayer(player: Player): Observable<Player> {
    let params = new HttpParams();
    params = params.append('firstName', player.firstName);
    params = params.append('lastName', player.lastName);

    return this._http.get<Player>(`${BACKEND_URL}/player`, { params: params })
    .pipe(tap((data: Player) => {
      data.fullName = `${data.firstName} ${data.lastName}`;
      data.partials = 0;
      return data;
    }));
  }

  /**
   * Persist an user into DB
   * @param user The user to persist
   */
  createPlayer(user: Player): Observable<Player> {
    return this._http.post<Player>(`${BACKEND_URL}/player`, {...user})
    .pipe(tap((data: Player) => {
      data.fullName = `${data.firstName} ${data.lastName}`;
      return data;
    }));
  }
}

