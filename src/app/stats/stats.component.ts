import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { Store, State } from '@ngrx/store';
import { Player } from '../interfaces';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {
  players: Player[];
  streaks: {}[];
  globalStreaks: any[];
  paginationData: { page: any; limit: any; };
  ids: number[] = [];

  constructor(
    private statsService: StatsService,
    private store: Store<State<any>>
  ) {}

  ngOnInit() {
    const playersObservable = this.store.select('playerFeature');
    const gamesObservable = this.store.select('gameFeature');

    playersObservable.subscribe(p => {
      this.players = Object.values(p.entities);
      this.ids = this.players.map(player => player.id);
    });

    gamesObservable.subscribe(s => {
      this.globalStreaks = Object.values(s.entities);
    });

    this._getStreakDetails();
  }

  _getStreakDetails(page: number = 1) {
    this.statsService.getStreakDetail(this.ids, page)
      .subscribe((data: any) => {
        this.streaks = data.data;
        this.paginationData = { page: data.page, limit: data.pageCount };
      });
  }

  prevPage() {
    this._getStreakDetails(this.paginationData.page - 1);
  }
  nextPage() {
    this._getStreakDetails(this.paginationData.page + 1);
  }

  goToPage(event: number) {
    this._getStreakDetails(event);
  }
}
