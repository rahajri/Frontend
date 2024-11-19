import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyidentityComponent } from './verifyidentity.component';

describe('VerifyidentityComponent', () => {
  let component: VerifyidentityComponent;
  let fixture: ComponentFixture<VerifyidentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyidentityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyidentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
