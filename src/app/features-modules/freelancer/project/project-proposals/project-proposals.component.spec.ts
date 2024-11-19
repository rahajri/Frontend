import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProposalsComponent } from './project-proposals.component';

describe('ProjectProposalsComponent', () => {
  let component: ProjectProposalsComponent;
  let fixture: ComponentFixture<ProjectProposalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectProposalsComponent]
    });
    fixture = TestBed.createComponent(ProjectProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
