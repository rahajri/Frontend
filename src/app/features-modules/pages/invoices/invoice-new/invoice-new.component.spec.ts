import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceNewComponent } from './invoice-new.component';

describe('InvoiceNewComponent', () => {
  let component: InvoiceNewComponent;
  let fixture: ComponentFixture<InvoiceNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
