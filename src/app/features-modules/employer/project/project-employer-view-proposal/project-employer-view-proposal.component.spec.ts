import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEmployerViewProposalComponent } from './project-employer-view-proposal.component';

describe('ProjectEmployerViewProposalComponent', () => {
  let component: ProjectEmployerViewProposalComponent;
  let fixture: ComponentFixture<ProjectEmployerViewProposalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectEmployerViewProposalComponent]
    });
    fixture = TestBed.createComponent(ProjectEmployerViewProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
