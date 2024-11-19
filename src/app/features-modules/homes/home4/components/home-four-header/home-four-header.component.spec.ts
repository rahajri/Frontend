import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFourHeaderComponent } from './home-four-header.component';

describe('HomeFourHeaderComponent', () => {
  let component: HomeFourHeaderComponent;
  let fixture: ComponentFixture<HomeFourHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFourHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFourHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
