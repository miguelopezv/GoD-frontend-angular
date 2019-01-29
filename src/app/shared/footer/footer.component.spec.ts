import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { Store, StoreModule } from '@ngrx/store';
import { State } from 'src/app/interfaces/state.interface';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let store: Store<State>;
  let location: Location;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule.forRoot({ })],
      declarations: [ FooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(FooterComponent);
    store = fixture.debugElement.injector.get(Store);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
