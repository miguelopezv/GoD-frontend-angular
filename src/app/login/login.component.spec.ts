import { of, Observable } from 'rxjs';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { PlayersService } from '../services/players.service';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { Player } from '../interfaces';

const result: Player = {
  id: 1,
  firstName: 'Miguel',
  lastName: 'Lopez',
  wonMatches: [],
  losedMatches: [],
  partials: 0
};

class MockPlayersService {
  createPlayer(): Observable<Player> {
    return of(result);
  }
}

let mockService: MockPlayersService;
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    mockService = new MockPlayersService();
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({})
      ],
      declarations: [LoginComponent],
      providers: [
        {
          provide: PlayersService,
          useValue: mockService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a valid form', () => {
    const el = fixture.debugElement.query(By.css('button')).nativeElement;
    component.loginForm.controls['firstName'].setValue('Miguel');
    component.loginForm.controls['lastName'].setValue('Lopez');
    component.loginForm.controls['createdUser'].setValue(true);

    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call submit method', () => {
    fixture.detectChanges();
    const el = fixture.nativeElement.querySelector('button');
    el.disabled = false;
    spyOn(component, 'onSubmit');
    el.click();

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });
});
