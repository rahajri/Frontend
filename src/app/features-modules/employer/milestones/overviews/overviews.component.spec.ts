import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewsComponent } from './overviews.component';

describe('OverviewsComponent', () => {
  let component: OverviewsComponent;
  let fixture: ComponentFixture<OverviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
