import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeThreeHeaderComponent } from './home-three-header.component';

describe('HomeThreeHeaderComponent', () => {
  let component: HomeThreeHeaderComponent;
  let fixture: ComponentFixture<HomeThreeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeThreeHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeThreeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
