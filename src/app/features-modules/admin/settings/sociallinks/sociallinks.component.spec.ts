import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SociallinksComponent } from './sociallinks.component';

describe('SociallinksComponent', () => {
  let component: SociallinksComponent;
  let fixture: ComponentFixture<SociallinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SociallinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SociallinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
