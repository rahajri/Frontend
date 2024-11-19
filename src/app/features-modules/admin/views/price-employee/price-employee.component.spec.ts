import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceEmployeeComponent } from './price-employee.component';

describe('PriceEmployeeComponent', () => {
  let component: PriceEmployeeComponent;
  let fixture: ComponentFixture<PriceEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
