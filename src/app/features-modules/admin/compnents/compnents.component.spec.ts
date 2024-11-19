import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompnentsComponent } from './compnents.component';

describe('CompnentsComponent', () => {
  let component: CompnentsComponent;
  let fixture: ComponentFixture<CompnentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompnentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompnentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
