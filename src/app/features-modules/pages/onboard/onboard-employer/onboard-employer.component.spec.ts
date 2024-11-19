import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardEmployerComponent } from './onboard-employer.component';

describe('OnboardEmployerComponent', () => {
  let component: OnboardEmployerComponent;
  let fixture: ComponentFixture<OnboardEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardEmployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
