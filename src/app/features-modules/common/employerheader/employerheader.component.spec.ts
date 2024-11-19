import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerheaderComponent } from './employerheader.component';

describe('EmployerheaderComponent', () => {
  let component: EmployerheaderComponent;
  let fixture: ComponentFixture<EmployerheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerheaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
