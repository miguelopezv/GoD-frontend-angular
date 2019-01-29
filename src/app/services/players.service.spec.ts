import { Player } from './../interfaces/player.interface';
import { TestBed } from '@angular/core/testing';
import { PlayersService } from './players.service';
import { Observable, of } from 'rxjs';

class MockPlayersService {
  getPlayer(): Observable<Player> {
    return of(result);
  }

  createPlayer(): Observable<Player> {
    return of(result);
  }
}

const result: Player = {
  id: 1,
  firstName: 'Miguel',
  lastName: 'Lopez',
  fullName: 'Miguel Lopez',
  wonMatches: [],
  losedMatches: [],
  partials: 0
};

let mockService: MockPlayersService;
describe('PlayersService', () => {
  beforeEach(() => {
    mockService = new MockPlayersService();
    TestBed.configureTestingModule({
      providers: [{ provide: PlayersService, useValue: mockService }],
    });
  });

  it('should be created', () => {
    const service: PlayersService = TestBed.get(PlayersService);
    expect(service).toBeTruthy();
  });

  it('should return a Player', async () => {
    const service: PlayersService = TestBed.get(PlayersService);
    service.getPlayer({firstName: 'Miguel', lastName: 'Lopez'}).subscribe(res => {
      expect(res).toEqual(result);
    });
  });

  it('should create a Player', async () => {
    const service: PlayersService = TestBed.get(PlayersService);
    service.createPlayer({firstName: 'Miguel', lastName: 'Lopez'}).subscribe(res => {
      expect(res).toEqual(result);
    });
  });
});


