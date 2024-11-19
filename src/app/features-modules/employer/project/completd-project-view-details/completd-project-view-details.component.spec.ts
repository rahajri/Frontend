import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletdProjectViewDetailsComponent } from './completd-project-view-details.component';

describe('CompletdProjectViewDetailsComponent', () => {
  let component: CompletdProjectViewDetailsComponent;
  let fixture: ComponentFixture<CompletdProjectViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletdProjectViewDetailsComponent]
    });
    fixture = TestBed.createComponent(CompletdProjectViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
