import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkedfavouritesComponent } from './markedfavourites.component';

describe('MarkedfavouritesComponent', () => {
  let component: MarkedfavouritesComponent;
  let fixture: ComponentFixture<MarkedfavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarkedfavouritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarkedfavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
