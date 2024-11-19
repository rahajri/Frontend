import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnholdComponent } from './onhold.component';

describe('OnholdComponent', () => {
  let component: OnholdComponent;
  let fixture: ComponentFixture<OnholdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnholdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnholdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
