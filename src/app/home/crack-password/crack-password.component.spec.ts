import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrackPasswordComponent } from './crack-password.component';

describe('CrackPasswordComponent', () => {
  let component: CrackPasswordComponent;
  let fixture: ComponentFixture<CrackPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrackPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrackPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
