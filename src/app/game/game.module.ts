import { GameComponent } from './game.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GameComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [GameComponent]
})
export class GameModule { }
