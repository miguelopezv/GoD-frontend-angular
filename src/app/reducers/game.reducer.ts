import * as Actions from '../actions/game.actions';
import { Streak } from '../interfaces';

import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

export interface State extends EntityState<Streak> { }

export const streakAdapter: EntityAdapter<Streak> = createEntityAdapter<Streak>();

export const initialState: State = streakAdapter.getInitialState();

export function gameReducer(state: State = initialState, action: Actions.Actions) {

  switch (action.type) {
    case Actions.ADD_STREAK:
      return streakAdapter.addOne(action.payload, state);
    case Actions.UPDATE_STREAK:
      return  streakAdapter.updateOne(action.payload, state);
    case Actions.RESET_STREAKS:
      return initialState;
    default:
      return state;
  }
}
