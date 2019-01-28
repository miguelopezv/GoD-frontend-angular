import { GameModule } from './game/game.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { StoreModule, MetaReducer, State, ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromPlayer from './reducers/player.reducer';
import * as fromGame from './reducers/game.reducer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export const metaReducers: MetaReducer<State<any>>[] = !environment.production ? [storeFreeze] : [];
export const reducers: ActionReducerMap<any> = {
  player: fromPlayer.playerReducer,
  game: fromGame.gameReducer
};

@NgModule({
  declarations: [AppComponent, StatsComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    GameModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    StoreModule.forRoot( reducers, { metaReducers }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
