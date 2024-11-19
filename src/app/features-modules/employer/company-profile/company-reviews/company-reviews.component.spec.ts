import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReviewsComponent } from './company-reviews.component';

describe('CompanyReviewsComponent', () => {
  let component: CompanyReviewsComponent;
  let fixture: ComponentFixture<CompanyReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
