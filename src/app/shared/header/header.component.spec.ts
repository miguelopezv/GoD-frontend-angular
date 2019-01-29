import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header.component';
import { Store } from '@ngrx/store';
import { TestStore } from '../testing/TestStore';
import { State } from 'src/app/interfaces/state.interface';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let store: TestStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [HeaderComponent],
      providers: [{
        provide: Store,
        useClass: TestStore
      }]
    }).compileComponents();
  }));

  beforeEach(inject([Store], (testStore: TestStore<State>) => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = testStore;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return players from Store', () => {
    store.setState({ids: [1], entities: [{firstName: 'Miguel', lastName: 'Lopez'}]});
    component.ngOnInit();

    expect(component.players.length).toBe(1);
  });

  it('should return streaks from Store', () => {
    store.setState({ids: [1, 4], entities: [{id: 1, wins: 6}, {id: 4, wins: 4}]});
    component.ngOnInit();

    expect(component.globalStreak.length).toBe(2);
  });

  it('should convert a number to an array of that length', () => {
    const n = 4;
    const array = component.toArray(n);
    expect(array.length).toBe(4);
  });
});
