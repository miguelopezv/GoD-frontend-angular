import { PaginationComponent } from './../pagination/pagination.component';
import { StatsComponent } from './../../stats/stats.component';
import { GameComponent } from './../../game/game.component';
import { LoginComponent } from './../../login/login.component';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer.component';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { TestStore } from '../testing/TestStore';
import { State } from 'src/app/interfaces/state.interface';
import { RouterTestingModule } from '@angular/router/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let store: TestStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        RouterTestingModule.withRoutes([
          {path: 'login', component: LoginComponent},
          {path: 'game', component: GameComponent},
          {path: 'stats', component: StatsComponent}
        ])
      ],
      declarations: [FooterComponent, LoginComponent, GameComponent, StatsComponent, PaginationComponent],
      providers: [{
        provide: Store,
        useClass: TestStore
      }]
    }).compileComponents();
  }));

  beforeEach(inject([Store], (testStore: TestStore<State>) => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = testStore;
    store.setState({ids: [1 , 2], entities: [{firstName: 'Miguel'}, {firstName: 'Juan'}]});
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login', () => {
    spyOn(component._router, 'navigate').and.returnValue(true);
    const el = fixture.debugElement.query(By.css('#reboot')).nativeElement;
    el.click();

    expect(component._router.navigate).toHaveBeenCalledWith(['login']);
  });

  it('should navigate to game when on stats', () => {
    spyOn(component._router, 'navigate').and.returnValue(true);
    component.onStats = true;
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('#game')).nativeElement;
    el.click();

    expect(component._router.navigate).toHaveBeenCalledWith(['game']);
  });

  it('should navigate to stats', () => {
    spyOn(component._router, 'navigate').and.returnValue(true);
    const el = fixture.debugElement.query(By.css('#stats')).nativeElement;
    el.click();

    expect(component._router.navigate).toHaveBeenCalledWith(['stats']);
  });
});
