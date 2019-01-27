import { Action } from '@ngrx/store';
import * as Actions from '../actions/index';
import { Player } from '../interfaces';

const initialState: Player[] = [];

export function playerReducer(state: Player[] = initialState, action: Actions.Actions) {

  switch (action.type) {
    case Actions.ADD_PLAYER:
      return [...state, {...action.payload}];
    case Actions.RESET_PLAYERS:
      return initialState;
    default:
      return state;
  }
}
