import { Component, OnInit } from '@angular/core';
import { Store, State } from '@ngrx/store';
import * as PlayerActions from '../actions/player.actions';
import * as GameActions from '../actions/game.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  constructor(
    private store: Store<State<any>>,
    private _router: Router
  ) {}

  ngOnInit() {
  }

  /**
   * Log out both players, come back to login and reset all States
   */
  reboot() {
    this.store.dispatch(new PlayerActions.ResetPlayers());
    this.store.dispatch(new GameActions.ResetStreaks());
    this._router.navigate(['login']);
  }

  /**
   * Navigate to stats component
   */
  goToStats() {
    this._router.navigate(['stats']);
  }

}
