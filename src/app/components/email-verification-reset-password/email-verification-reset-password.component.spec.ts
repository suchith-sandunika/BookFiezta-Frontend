import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerificationResetPasswordComponent } from './email-verification-reset-password.component';

describe('EmailVerificationResetPasswordComponent', () => {
  let component: EmailVerificationResetPasswordComponent;
  let fixture: ComponentFixture<EmailVerificationResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailVerificationResetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailVerificationResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
