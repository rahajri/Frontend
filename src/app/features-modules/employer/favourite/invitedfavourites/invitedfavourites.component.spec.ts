import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitedfavouritesComponent } from './invitedfavourites.component';

describe('InvitedfavouritesComponent', () => {
  let component: InvitedfavouritesComponent;
  let fixture: ComponentFixture<InvitedfavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitedfavouritesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitedfavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
