import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentProjectComponent } from './payment-project.component';

describe('PaymentProjectComponent', () => {
  let component: PaymentProjectComponent;
  let fixture: ComponentFixture<PaymentProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentProjectComponent]
    });
    fixture = TestBed.createComponent(PaymentProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
