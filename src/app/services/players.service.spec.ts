import { Player } from './../interfaces/player.interface';
import { TestBed } from '@angular/core/testing';
import { PlayersService } from './players.service';

class MockPlayersService {
  getPlayer() {
    return result;
  }

  createPlayer() {
    return result;
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
    expect(service.getPlayer({firstName: 'Miguel', lastName: 'Lopez'})).toEqual(result);
  });

  it('should create a Player', async () => {
    const service: PlayersService = TestBed.get(PlayersService);
    expect(service.createPlayer({firstName: 'Miguel', lastName: 'Lopez'})).toEqual(result);
  });
});


