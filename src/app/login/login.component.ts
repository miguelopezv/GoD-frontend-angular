import { Component, OnInit } from '@angular/core';
import { PlayersService } from './../services/players.service';
import { Player } from '../interfaces';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, State } from '@ngrx/store';
import * as PlayerActions from '../actions/player.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit {
  players: Observable<any>;
  playerNumber: number = 0;
  loginForm: FormGroup;
  existingUser: AbstractControl;

  constructor(
    private _playersService: PlayersService,
    private _router: Router,
    private _store: Store<State<any>>
  ) {}

  ngOnInit() {
    this.players = this._store.select('playerFeature');
    this.loginForm = this._createFormGroup();
    this.existingUser = this.loginForm.controls['createdUser'];
  }

  /**
   * Submit the data from the form and cleans it
   */
  onSubmit() {
    this._getPlayer(this.loginForm.value);
    this.loginForm.reset();
  }

  /**
   * Retrieves or saves an user from the Database
   * @param formData the data from the loginForm
   */
  private _getPlayer(formData: Player) {
    if (this.existingUser.value) {
      this._playersService.getPlayer(formData)
      .subscribe((player: Player) => this._dispatch(player));
    } else {
      this._playersService.createPlayer(formData)
      .subscribe((player: Player) => {
        this._dispatch(player);
      });
    }
  }

  /**
   * Dispatch the action to update the State
   * @param player the player to be saved on State
   */
  private _dispatch(player: Player) {
    this._store.dispatch(new PlayerActions.AddPlayer(player));
    this._checkLength();
  }

  /**
   * Checks the length of State to navigate to next page
   */
  private _checkLength() {
    this.players.subscribe(data => {
      this. playerNumber = data.ids.length;
      if (this.playerNumber === 2) { this._router.navigateByUrl('/game'); }
    });
  }

  /**
   * Creates the Form Group to control the form
   */
  private _createFormGroup() {
    return new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      createdUser: new FormControl()
    });
  }
}
