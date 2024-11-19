import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMilestoneComponent } from './project-milestone.component';

describe('ProjectMilestoneComponent', () => {
  let component: ProjectMilestoneComponent;
  let fixture: ComponentFixture<ProjectMilestoneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMilestoneComponent]
    });
    fixture = TestBed.createComponent(ProjectMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
