import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFreelanceComponent } from './price-freelance.component';

describe('PriceFreelanceComponent', () => {
  let component: PriceFreelanceComponent;
  let fixture: ComponentFixture<PriceFreelanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceFreelanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceFreelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
