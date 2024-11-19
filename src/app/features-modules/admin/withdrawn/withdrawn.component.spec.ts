import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawnComponent } from './withdrawn.component';

describe('WithdrawnComponent', () => {
  let component: WithdrawnComponent;
  let fixture: ComponentFixture<WithdrawnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrawnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
