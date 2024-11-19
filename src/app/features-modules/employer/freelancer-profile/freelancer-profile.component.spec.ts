import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerProfileComponent } from './freelancer-profile.component';

describe('FreelancerProfileComponent', () => {
  let component: FreelancerProfileComponent;
  let fixture: ComponentFixture<FreelancerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreelancerProfileComponent]
    });
    fixture = TestBed.createComponent(FreelancerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
