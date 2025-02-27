import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSuccessPopupComponent } from './login-success-popup.component';

describe('LoginSuccessPopupComponent', () => {
  let component: LoginSuccessPopupComponent;
  let fixture: ComponentFixture<LoginSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSuccessPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
