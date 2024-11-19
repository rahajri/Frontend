import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardScreenComponent } from './onboard-screen.component';

describe('OnboardScreenComponent', () => {
  let component: OnboardScreenComponent;
  let fixture: ComponentFixture<OnboardScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
