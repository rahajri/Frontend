import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorfoundComponent } from './errorfound.component';

describe('ErrorfoundComponent', () => {
  let component: ErrorfoundComponent;
  let fixture: ComponentFixture<ErrorfoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorfoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorfoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
