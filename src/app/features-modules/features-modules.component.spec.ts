import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesModulesComponent } from './features-modules.component';

describe('FeaturesModulesComponent', () => {
  let component: FeaturesModulesComponent;
  let fixture: ComponentFixture<FeaturesModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturesModulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
