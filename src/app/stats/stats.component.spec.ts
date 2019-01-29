import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { StatsComponent } from './stats.component';
import { PaginationComponent } from '../shared/pagination/pagination.component';
import { Component, Input } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { Observable, of } from 'rxjs';
import { StoreModule } from '@ngrx/store';

@Component({ selector: 'app-footer', template: '' })
class MockFooterComponent { }

class MockStatsService {
  getStreak(): Observable<any> {
    return of({
      player1: { id: 1, wins: 4 },
      player2: { id: 2, wins: 8 }
    });
  }
  saveGame({ }) {
    return {
      winnerPlayer: 6,
      loserPlayer: 4,
      id: 13,
      createdAt: '2019-01-28T01:18:14.415Z'
    };
  }
  getStreakDetails() {
    return of({ page: 2, pageCount: 2, data: [] });
  }
}

let mockService: MockStatsService;
describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    mockService = new MockStatsService();
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule, StoreModule.forRoot({})],
      declarations: [ StatsComponent, MockFooterComponent, PaginationComponent ],
      providers: [{
        provide: StatsService,
        useValue: mockService
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
