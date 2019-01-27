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
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import * as fromPlayer from './reducers/player.reducer';

export const metaReducers: MetaReducer<State<any>>[] = !environment.production ? [storeFreeze] : [];
export const reducers: ActionReducerMap<any> = {
  player: fromPlayer.playerReducer
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
    StoreModule.forRoot( reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({maxAge: 10})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
