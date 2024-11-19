import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingProjectsComponent } from './ongoing-projects.component';

describe('OngoingProjectsComponent', () => {
  let component: OngoingProjectsComponent;
  let fixture: ComponentFixture<OngoingProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OngoingProjectsComponent]
    });
    fixture = TestBed.createComponent(OngoingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
