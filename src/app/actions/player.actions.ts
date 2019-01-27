import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Player } from '../interfaces/player.interface';

export const ADD_PLAYER = '[PLAYER] Add';
export const RESET_PLAYERS = '[PLAYER] Reset';
export const UPDATE_PLAYER = '[PLAYER] Update';

export class AddPlayer implements Action {
  readonly type = ADD_PLAYER;

  constructor(public payload: Player) { }
}

export class ResetPlayers implements Action {
  readonly type = RESET_PLAYERS;

  constructor() { }
}

export class UpdatePlayer implements Action {
  readonly type = UPDATE_PLAYER;

  constructor(public payload: {id: number, changes: Partial<Player>}) {}
}

export type Actions = AddPlayer | ResetPlayers | UpdatePlayer;
