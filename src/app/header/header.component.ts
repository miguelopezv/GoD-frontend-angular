import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../interfaces';
import { Store, State } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  players: Player[];

  constructor(
    private store: Store<State<any>>
  ) { }

  ngOnInit() {
    const playersObservable = this.store.select('playerFeature');
    playersObservable.subscribe(players => this.players = players);
  }

}
