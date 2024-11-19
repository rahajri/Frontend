import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFiveHeaderComponent } from './home-five-header.component';

describe('HomeFiveHeaderComponent', () => {
  let component: HomeFiveHeaderComponent;
  let fixture: ComponentFixture<HomeFiveHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeFiveHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFiveHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
