import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as PlayerActions from '../../actions/player.actions';
import * as GameActions from '../../actions/game.actions';
import { Router } from '@angular/router';
import { State } from 'src/app/interfaces/state.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  onStats: boolean = this._router.url === '/stats';

  constructor(
    private store: Store<State>,
    public _router: Router
  ) {}

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

  /**
   * Navigate to game component
   */
  goToGame() {
    this._router.navigate(['game']);
  }

}
