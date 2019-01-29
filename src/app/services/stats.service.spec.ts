import { TestBed } from '@angular/core/testing';
import { StatsService } from './stats.service';
import { of, Observable } from 'rxjs';
import { Streak } from '../interfaces';

class MockStatsService {
  getStreak(): Observable<Object> {
    return of({
      player1: { id: 1, wins: 4 },
      player2: { id: 2, wins: 8 }
    });
  }

  saveGame(): Observable<Object> {
    return of({ winnerPlayer: 6, loserPlayer: 4, id: 13, createdAt: '2019-01-28T01:18:14.415Z' });
  }

  getStreakDetails(): Observable<Object> {
    return of({ page: 2, pageCount: 2, data: [] });
  }
}

let mockService: MockStatsService;
describe('StatsService', () => {
  beforeEach(() => {
    mockService = new MockStatsService();
    TestBed.configureTestingModule({
      providers: [{ provide: StatsService, useValue: mockService }]
    });
  });

  it('should be created', () => {
    const service: StatsService = TestBed.get(StatsService);
    expect(service).toBeTruthy();
  });

  it('should return a Streak', async () => {
    const result = {
      player1: {
        id: 1,
        wins: 4
      },
      player2: {
        id: 2,
        wins: 8
      }
    };

    const service: StatsService = TestBed.get(StatsService);
    service.getStreak([1, 2]).subscribe(res => {
      expect(res).toEqual(result);
    });
  });

  it('should save a game', async () => {
    const result = {
      winnerPlayer: 6,
      loserPlayer: 4,
      id: 13,
      createdAt: '2019-01-28T01:18:14.415Z',
    };

    const service: StatsService = TestBed.get(StatsService);
    service.saveGame({body: {winnerPlayer: 6, loserPlayer: 4}}).subscribe(res => {
      expect(res).toEqual(result);
    });
  });

  it('should return a Streak with details', async () => {
    const result = {
      page: 2,
      pageCount: 2,
      data: []
    };

    const service: StatsService = TestBed.get(StatsService);
    service.getStreakDetails([1, 2], 1).subscribe(res => {
      expect(res).toEqual(result);
    });
  });

});
