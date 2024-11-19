import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFourFooterComponent } from './home-four-footer.component';

describe('HomeFourFooterComponent', () => {
  let component: HomeFourFooterComponent;
  let fixture: ComponentFixture<HomeFourFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFourFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFourFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
