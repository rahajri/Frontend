import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectConfirmationComponent } from './project-confirmation.component';

describe('ProjectConfirmationComponent', () => {
  let component: ProjectConfirmationComponent;
  let fixture: ComponentFixture<ProjectConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectConfirmationComponent]
    });
    fixture = TestBed.createComponent(ProjectConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
