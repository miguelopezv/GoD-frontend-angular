import { Component, OnInit } from '@angular/core';
import { Player } from '../interfaces';
import { Store, State } from '@ngrx/store';
import { faCrown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  players: Player[];
  faCrown = faCrown;
  globalStreak: any[] = [];

  constructor(private store: Store<State<any>>) {}

  ngOnInit() {
    const playersObservable = this.store.select('playerFeature');
    playersObservable.subscribe(players => {
      this.players = Object.values(players.entities);
    });

    const gameObservable = this.store.select('gameFeature');
    gameObservable.subscribe(streak => {
      this.globalStreak = Object.values(streak.entities);
    });
  }

  /**
   * Converts partials integer into array to iterate crowns
   * @param n the number of partials wins per user
   */
  toArray(n: number): number[] {
    if (n === null) { n = 0; }
    return [...Array.from(Array(n).keys())];
  }
}
