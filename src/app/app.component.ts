import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common'; // Importe o CommonModule
import { RouterOutlet, Router } from '@angular/router'; // Importe o Router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // Adicione CommonModule e RouterOutlet
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loggedInUser: { name: string; isAdmin: boolean } | null = null; // Armazena o nome e a informação de administrador do usuário logado

  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Restaura o estado do usuário ao carregar a página
    this.authService.restoreUserState();

    // Observa mudanças no estado do usuário
    this.authService.getLoggedInUser().subscribe((user) => {
      this.loggedInUser = user; // Atualiza o nome e a informação de administrador no header
    });
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '300px', // Tamanho do modal
    });
  }

  logout() {
    this.authService.logout(); // Faz logout
  }

  goToAdminPanel() {
    this.router.navigate(['/admin']); // Navega para o painel de administração
  }
}