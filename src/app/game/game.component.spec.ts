import { Observable, of } from 'rxjs';
import { ADD_PLAYER } from './../actions/player.actions';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game.component';
import { Component } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { StoreModule, Store, } from '@ngrx/store';
import { State } from './../interfaces/state.interface';


@Component({selector: 'app-footer', template: ''})
class MockFooterComponent {}

class MockStatsService {
  getStreak(): Observable<any> {
    return of({
      player1: { id: 1, wins: 4 },
      player2: { id: 2, wins: 8 }
    });
  }
  saveGame({}) {
    return {
      winnerPlayer: 6,
      loserPlayer: 4,
      id: 13,
      createdAt: '2019-01-28T01:18:14.415Z'
    };
  }
  getStreakDetails() {
    return { page: 2, pageCount: 2, data: [] };
  }
}

let mockService: MockStatsService;
let store: Store<State>;
describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  const mockData = {
    id: 2,
    firstName: 'Miguel',
    lastName: 'Lopez',
    wonMatches: [],
    losedMatches: [],
    partials: 0
  };
  const mockData2 = {
    id: 3,
    firstName: 'Juan',
    lastName: 'Montoya',
    wonMatches: [],
    losedMatches: [],
    partials: 0
  };

  beforeEach(async(() => {
    mockService = new MockStatsService();
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        StoreModule.forRoot({})
      ],
      declarations: [GameComponent, MockFooterComponent],
      providers: [
        {
          provide: StatsService,
          useValue: mockService
        },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    store = fixture.debugElement.injector.get(Store);
    store.dispatch({ type: ADD_PLAYER, payload: mockData });
    store.dispatch({ type: ADD_PLAYER, payload: mockData2 });

    component = fixture.debugElement.componentInstance;
    component.players = [mockData, mockData2];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
