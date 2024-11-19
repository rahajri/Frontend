import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedComponent } from './verified.component';

describe('VerifiedComponent', () => {
  let component: VerifiedComponent;
  let fixture: ComponentFixture<VerifiedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerifiedComponent]
    });
    fixture = TestBed.createComponent(VerifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
