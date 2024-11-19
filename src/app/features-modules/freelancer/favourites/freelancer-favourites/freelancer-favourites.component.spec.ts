import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerFavouritesComponent } from './freelancer-favourites.component';

describe('FreelancerFavouritesComponent', () => {
  let component: FreelancerFavouritesComponent;
  let fixture: ComponentFixture<FreelancerFavouritesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FreelancerFavouritesComponent]
    });
    fixture = TestBed.createComponent(FreelancerFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
