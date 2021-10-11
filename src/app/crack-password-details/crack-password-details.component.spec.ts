import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrackPasswordDetailsComponent } from './crack-password-details.component';

describe('CrackPasswordDetailsComponent', () => {
  let component: CrackPasswordDetailsComponent;
  let fixture: ComponentFixture<CrackPasswordDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrackPasswordDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrackPasswordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
