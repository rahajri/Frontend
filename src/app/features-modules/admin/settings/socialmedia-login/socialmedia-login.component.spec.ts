import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialmediaLoginComponent } from './socialmedia-login.component';

describe('SocialmediaLoginComponent', () => {
  let component: SocialmediaLoginComponent;
  let fixture: ComponentFixture<SocialmediaLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialmediaLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialmediaLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
