import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTwoFooterComponent } from './home-two-footer.component';

describe('HomeTwoFooterComponent', () => {
  let component: HomeTwoFooterComponent;
  let fixture: ComponentFixture<HomeTwoFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTwoFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTwoFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
