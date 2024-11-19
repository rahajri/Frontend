import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeThreeFooterComponent } from './home-three-footer.component';

describe('HomeThreeFooterComponent', () => {
  let component: HomeThreeFooterComponent;
  let fixture: ComponentFixture<HomeThreeFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeThreeFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeThreeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
