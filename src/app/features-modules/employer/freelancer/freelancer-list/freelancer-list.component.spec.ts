import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerListComponent } from './freelancer-list.component';

describe('FreelancerListComponent', () => {
  let component: FreelancerListComponent;
  let fixture: ComponentFixture<FreelancerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
