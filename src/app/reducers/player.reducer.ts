import { Action } from '@ngrx/store';
import * as Actions from '../actions/index';
import { Player } from '../interfaces';

import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<Player> { }

export const playerAdapter: EntityAdapter<Player> = createEntityAdapter<Player>();

export const initialState: State = playerAdapter.getInitialState();

export function playerReducer(state: State = initialState, action: Actions.Actions) {

  switch (action.type) {
    case Actions.ADD_PLAYER:
      return playerAdapter.addOne(action.payload, state);
    case Actions.UPDATE_PLAYER:
      return  playerAdapter.updateOne(action.payload, state);
    case Actions.RESET_PLAYERS:
      return initialState;
    default:
      return state;
  }
}
