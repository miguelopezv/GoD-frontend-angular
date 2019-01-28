import { GameComponent } from './game.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { gameReducer } from '../reducers/game.reducer';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [GameComponent, FooterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('gameFeature', gameReducer)
  ],
  exports: [GameComponent]
})
export class GameModule {}
