import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material/dialog'; // Para fechar o modal de login
import { MatDialog } from '@angular/material/dialog'; // Para abrir o pop-up de sucesso e o formulário de registro
import { LoginSuccessPopupComponent } from '../login-success-popup/login-success-popup.component'; // Pop-up de sucesso
import { RegisterComponent } from '../register/register.component'; // Importe o RegisterComponent
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>, // Para fechar o modal de login
    private dialog: MatDialog // Para abrir o pop-up de sucesso e o formulário de registro
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
  
      this.authService.login(credentials).subscribe(
        (response: { token: string; name: string; isAdmin: boolean }) => {
          localStorage.setItem('token', response.token); // Armazena o token no localStorage
  
          // Define o nome e a informação de administrador do usuário logado
          this.authService.setLoggedInUser(response.name, response.isAdmin);
  
          // Fecha o modal de login
          this.dialogRef.close();
  
          // Abre o pop-up de sucesso
          this.dialog.open(LoginSuccessPopupComponent, {
            width: '300px',
          });
        },
        (error) => {
          console.error('Erro no login:', error);
        }
      );
    }
  }

  openRegisterDialog() {
    this.dialogRef.close(); // Fecha o modal de login
    this.dialog.open(RegisterComponent, {
      width: '300px', // Abre o modal de registro
    });
  }
}