import { Action } from '@ngrx/store';
import { Streak } from '../interfaces';

export const ADD_STREAK = '[STREAK] Add';
export const RESET_STREAKS = '[STREAK] Reset';
export const UPDATE_STREAK = '[STREAK] Update';

export class AddStreak implements Action {
  readonly type = ADD_STREAK;

  constructor(public payload: Streak) { }
}

export class ResetStreaks implements Action {
  readonly type = RESET_STREAKS;

  constructor() { }
}

export class UpdateStreak implements Action {
  readonly type = UPDATE_STREAK;

  constructor(public payload: { id: number, changes: Partial<Streak> }) { }
}

export type Actions = AddStreak | ResetStreaks | UpdateStreak;

