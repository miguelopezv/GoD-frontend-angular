import { Component, OnInit } from '@angular/core';
import { StatsService } from './../services/stats.service';
import { Streak, Player } from '../interfaces';
import * as GameOptions from '../shared/options.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { Store, State } from '@ngrx/store';
import * as PlayerActions from '../actions/player.actions';
import * as GameActions from '../actions/game.actions';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {
  round: number = 1;
  streaks: Streak[];
  values: number[] = [];
  winner: Player;
  players: Player[];
  gameForm: FormGroup;
  options: string[] = ['rocks', 'paper', 'scissors'];

  constructor(
    private statsService: StatsService,
    private store: Store<State<any>>
  ) {}

  ngOnInit() {
    const playersObservable = this.store.select('playerFeature');
    const gamesObservable = this.store.select('gameFeature');

    playersObservable.subscribe(p => {
      this.players = Object.values(p.entities);
    });

    gamesObservable.subscribe(s => {
      this.streaks = Object.values(s.entities);
    });

    this.gameForm = this._createFormGroup();
    this._getPlayersStreak(this.players.map(p => p.id));
  }

  /**
   * Submit form and checks result when both players have played
   */
  onSubmit() {
    this.values.push(this.gameForm.controls['option'].value);
    this.gameForm.reset();

    if (this.values.length === 2) {
      this._result();
    }
  }

  /**
   * Function to reset winner, round, partials and persist winner stats on DB and State
   */
  resetAndSave() {
    this.statsService
      .saveGame({
        winnerPlayer: this.winner.id,
        loserPlayer: this.players[
          this.players.findIndex(p => p.id !== this.winner.id)
        ].id
      })
      .subscribe();

    this._dispatchUpdatePartials(0, true);
    this._dispatchUpdatePartials(1, true);
    this._dispatchUpdateStreak(this.winner.id);
    this.round = 1;
    this.winner = undefined;
  }

  /**
   * Returns the global streak between two players and store it
   * @param playersId the ids from both players to compare
   */
  private _getPlayersStreak(playersId: number[]) {
    this.statsService.getStreak(playersId).subscribe((streak: Streak[]) => {
      const streakArray = Object.values(streak);
      streakArray.forEach(element => {
        this.store.dispatch(new GameActions.AddStreak(element));
      });
    });
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
          this._dispatchUpdatePartials(1);
          break;
        case GameOptions.options.rocks:
          this._dispatchUpdatePartials(0);
          break;
        default:
          break;
      }
    }

    if (+this.values[0] === GameOptions.options.rocks) {
      switch (+this.values[1]) {
        case GameOptions.options.paper:
          this._dispatchUpdatePartials(1);
          break;
        case GameOptions.options.scissors:
          this._dispatchUpdatePartials(0);
          break;
        default:
          break;
      }
    }

    if (+this.values[0] === GameOptions.options.scissors) {
      switch (+this.values[1]) {
        case GameOptions.options.rocks:
          this._dispatchUpdatePartials(1);
          break;
        case GameOptions.options.paper:
          this._dispatchUpdatePartials(0);
          break;
        default:
          break;
      }
    }

    this._checkStatus();
  }

  /**
   * Dispatch action to update player
   * @param index position of the player on the State
   * @param resetPartials if partials for specific player should return to zero
   */
  private _dispatchUpdatePartials(index: number, resetPartials: boolean = false) {
    const currentPartials: number = !resetPartials ? this.players[index].partials : -1;
    this.store.dispatch(
      new PlayerActions.UpdatePlayer({
        id: this.players[index].id,
        changes: { partials: currentPartials + 1 }
      })
    );
  }

  /**
   * Dispatch actionto update streak
   * @param id position of the streak to update
   */
  private _dispatchUpdateStreak(id: number) {
    const index = this.streaks.findIndex(s => s.id === id);
    this.store.dispatch(
      new GameActions.UpdateStreak({
        id: id,
        changes: { wins: this.streaks[index].wins + 1 }
      })
    );
  }

  /**
   * Checks if there's a winner already
   */
  private _checkStatus() {
    this.values = [];
    const winnerArray = this.players.filter(p => p.partials === 3);
    if (winnerArray) {
      this.round++;
      this.winner = winnerArray[0];
    }
  }
}
