import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-success-popup',
  templateUrl: './login-success-popup.component.html',
  styleUrls: ['./login-success-popup.component.css'],
})
export class LoginSuccessPopupComponent {
  constructor(private dialogRef: MatDialogRef<LoginSuccessPopupComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}