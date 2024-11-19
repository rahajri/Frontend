import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedProjectFilesComponent } from './completed-project-files.component';

describe('CompletedProjectFilesComponent', () => {
  let component: CompletedProjectFilesComponent;
  let fixture: ComponentFixture<CompletedProjectFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedProjectFilesComponent]
    });
    fixture = TestBed.createComponent(CompletedProjectFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
