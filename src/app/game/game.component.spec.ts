import { Observable, of } from 'rxjs';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { GameComponent } from './game.component';
import { Component } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { Store } from '@ngrx/store';
import { State } from './../interfaces/state.interface';
import { TestStore } from '../shared/testing/TestStore';

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

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let store: TestStore<State>;

  beforeEach(async(() => {
    mockService = new MockStatsService();
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [GameComponent, MockFooterComponent],
      providers: [
        {
          provide: StatsService,
          useValue: mockService
        },
        {
          provide: Store,
          useClass: TestStore
        }]
    }).compileComponents();
  }));

  beforeEach(inject([Store], (testStore: TestStore<State>) => {
    fixture = TestBed.createComponent(GameComponent);
    store = testStore;
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should return players from Store', () => {
  //   store.setState({ ids: [1], entities: [{ firstName: 'Miguel', lastName: 'Lopez' }] });
  //   component.ngOnInit();

  //   expect(component.players.length).toBe(1);
  // });

  // it('should return streaks from Store', () => {
  //   store.setState({ ids: [1, 4], entities: [{ id: 1, wins: 6 }, { id: 4, wins: 4 }] });
  //   component.ngOnInit();

  //   expect(component.streaks.length).toBe(2);
  // });
});
