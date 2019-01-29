import { GameModule } from './game/game.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatsComponent } from './stats/stats.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { StoreModule, MetaReducer, State, ActionReducerMap } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromPlayer from './reducers/player.reducer';
import * as fromGame from './reducers/game.reducer';
import { SharedModule } from './shared/shared.module';

export const metaReducers: MetaReducer<State<any>>[] = !environment.production ? [storeFreeze] : [];
export const reducers: ActionReducerMap<any> = {
  player: fromPlayer.playerReducer,
  game: fromGame.gameReducer
};

@NgModule({
  declarations: [
    AppComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    GameModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
