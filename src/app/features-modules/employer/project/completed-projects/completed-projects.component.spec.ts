import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedProjectsComponent } from './completed-projects.component';

describe('CompletedProjectsComponent', () => {
  let component: CompletedProjectsComponent;
  let fixture: ComponentFixture<CompletedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletedProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompletedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
