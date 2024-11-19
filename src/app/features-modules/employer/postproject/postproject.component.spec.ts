import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostprojectComponent } from './postproject.component';

describe('PostprojectComponent', () => {
  let component: PostprojectComponent;
  let fixture: ComponentFixture<PostprojectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostprojectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
