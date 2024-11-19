import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFiveFooterComponent } from './home-five-footer.component';

describe('HomeFiveFooterComponent', () => {
  let component: HomeFiveFooterComponent;
  let fixture: ComponentFixture<HomeFiveFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFiveFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFiveFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
