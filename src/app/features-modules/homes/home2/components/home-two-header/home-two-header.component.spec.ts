import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTwoHeaderComponent } from './home-two-header.component';

describe('HomeTwoHeaderComponent', () => {
  let component: HomeTwoHeaderComponent;
  let fixture: ComponentFixture<HomeTwoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTwoHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTwoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
