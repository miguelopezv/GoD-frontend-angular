import { Component, OnInit } from '@angular/core';
import { StatsService } from './../services/stats.service';
import { Streak, Player } from '../interfaces';
import * as GameOptions from '../shared/options.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, State } from '@ngrx/store';
import * as PlayerActions from '../actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  streak: Streak;
  gamePartials = ([] = []);
  values: number[] = [];
  winner: Player;
  players: any;
  gameForm: FormGroup;
  options: any = ['rocks', 'paper', 'scissors'];

  constructor(
    private statsService: StatsService,
    private store: Store<State<any>>
  ) {}

  ngOnInit() {
    const playersObservable = this.store.select('playerFeature');
    playersObservable.subscribe(p => {
      this.players = Object.values(p.entities);
    });
    this.gameForm = this._createFormGroup();
    // this.getPlayersStreak(this.playersId);
  }

  /**
   * Submit form and checks result when both players have played
   */
  onSubmit() {
    this.values.push(this.gameForm.controls['option'].value);
    if (this.values.length === 2) {
      this._result();
    }
  }

  resetAndSave() {
    this._dispatchUpdate(0, true);
    this._dispatchUpdate(1, true);
    // this.statsService.save
  }

  getPlayersStreak(playersId: number[]) {
    this.statsService
      .getStreak(playersId)
      .subscribe((streak: Streak) => (this.streak = streak));
  }

  /**
   * Creates the Form Group to control the form
   */
  private _createFormGroup() {
    return new FormGroup({
      id: new FormControl(),
      option: new FormControl()
    });
  }

  /**
   * Validates which one of the two players wins the round
   */
  private _result() {
    if (+this.values[0] === GameOptions.options.paper) {
      switch (+this.values[1]) {
        case GameOptions.options.scissors:
          this._dispatchUpdate(1);
          break;
        case GameOptions.options.rocks:
          this._dispatchUpdate(0);
          break;
        default:
          break;
      }
    }

    if (+this.values[0] === GameOptions.options.rocks) {
      switch (+this.values[1]) {
        case GameOptions.options.paper:
          this._dispatchUpdate(1);
          break;
        case GameOptions.options.scissors:
          this._dispatchUpdate(0);
          break;
        default:
          break;
      }
    }

    if (+this.values[0] === GameOptions.options.scissors) {
      switch (+this.values[1]) {
        case GameOptions.options.rocks:
          this._dispatchUpdate(1);
          break;
        case GameOptions.options.paper:
          this._dispatchUpdate(0);
          break;
        default:
          break;
      }
    }

    this._checkStatus();
  }

  /**
   * Dispatch Action to update player
   * @param index position of the player on the State
   */
  private _dispatchUpdate(index: number, resetPartials: boolean = false) {
    const currentPartials: number = !resetPartials ? this.players[index].partials : -1;
    this.store.dispatch(
      new PlayerActions.UpdatePlayer({
        id: this.players[index].id,
        changes: { partials: currentPartials + 1 }
      })
    );
  }

  /**
   * Checks if there's a winner already
   */
  private _checkStatus() {
    this.values = [];
    this.winner = this.players.filter(p => p.partials === 2);
    if (this.winner) {
      this.winner = this.winner[0];
    }
  }
}
