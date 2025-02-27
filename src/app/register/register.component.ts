import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material/dialog'; // Para fechar o modal de registro
import { MatDialog } from '@angular/material/dialog'; // Para abrir o modal de login
import { LoginComponent } from '../login/login.component'; // Importe o LoginComponent
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterComponent>, // Para fechar o modal de registro
    private dialog: MatDialog // Para abrir o modal de login
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isAdmin: [false],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe(
        (response: any) => {
          this.dialogRef.close(); // Fecha o modal de registro
          this.dialog.open(LoginComponent, {
            width: '300px', // Abre o modal de login
          });
        },
        (error: any) => {
          console.error('Erro no cadastro:', error);
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close(); // Fecha o modal de registro manualmente
  }
}