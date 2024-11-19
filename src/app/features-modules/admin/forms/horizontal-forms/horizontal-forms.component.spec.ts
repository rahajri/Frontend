import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalFormsComponent } from './horizontal-forms.component';

describe('HorizontalFormsComponent', () => {
  let component: HorizontalFormsComponent;
  let fixture: ComponentFixture<HorizontalFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
