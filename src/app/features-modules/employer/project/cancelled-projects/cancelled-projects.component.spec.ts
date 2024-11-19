import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledProjectsComponent } from './cancelled-projects.component';

describe('CancelledProjectsComponent', () => {
  let component: CancelledProjectsComponent;
  let fixture: ComponentFixture<CancelledProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelledProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
