import { GameComponent } from './game.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from '../reducers/game.reducer';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('gameFeature', gameReducer)
  ],
  exports: [GameComponent]
})
export class GameModule {}
