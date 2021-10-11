import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptionDetailsComponent } from './encryption-details.component';

describe('EncryptionDetailsComponent', () => {
  let component: EncryptionDetailsComponent;
  let fixture: ComponentFixture<EncryptionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncryptionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
