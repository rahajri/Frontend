import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerheaderComponent } from './freelancerheader.component';

describe('FreelancerheaderComponent', () => {
  let component: FreelancerheaderComponent;
  let fixture: ComponentFixture<FreelancerheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
