import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerInvitationsComponent } from './freelancer-invitations.component';

describe('FreelancerInvitationsComponent', () => {
  let component: FreelancerInvitationsComponent;
  let fixture: ComponentFixture<FreelancerInvitationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreelancerInvitationsComponent]
    });
    fixture = TestBed.createComponent(FreelancerInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
