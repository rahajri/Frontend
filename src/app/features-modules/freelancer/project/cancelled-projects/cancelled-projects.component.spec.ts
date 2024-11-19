import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledProjectsComponent } from './cancelled-projects.component';

describe('CancelledProjectsComponent', () => {
  let component: CancelledProjectsComponent;
  let fixture: ComponentFixture<CancelledProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancelledProjectsComponent]
    });
    fixture = TestBed.createComponent(CancelledProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
