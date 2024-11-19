import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingProjectsComponent } from './pending-projects.component';

describe('PendingProjectsComponent', () => {
  let component: PendingProjectsComponent;
  let fixture: ComponentFixture<PendingProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
