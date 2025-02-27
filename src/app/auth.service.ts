import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Importe o Router
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // Importe a função jwtDecode corretamente

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://restaurante-webapp-back.vercel.app/api';
  private loggedInUser = new BehaviorSubject<{ name: string; isAdmin: boolean } | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  // Método para fazer login
  login(credentials: { email: string; password: string }): Observable<{ token: string; name: string; isAdmin: boolean }> {
    return this.http.post<{ token: string; name: string; isAdmin: boolean }>(`${this.apiUrl}/login`, credentials);
  }

  // Método para fazer registro
  register(user: { name: string; email: string; password: string; isAdmin?: boolean }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  // Método para fazer logout
  logout() {
    localStorage.removeItem('token');
    this.loggedInUser.next(null);
    this.router.navigate(['/home']);
  }

  // Método para definir o usuário logado
  setLoggedInUser(name: string, isAdmin: boolean) {
    this.loggedInUser.next({ name, isAdmin });
  }

  // Método para obter o nome do usuário logado
  getLoggedInUser(): Observable<{ name: string; isAdmin: boolean } | null> {
    return this.loggedInUser.asObservable();
  }

  // Método para restaurar o estado do usuário ao carregar a página
  restoreUserState() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      console.log('Token armazenado:', token); // <-- Adiciona esse log para depuração
  
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const userName = decodedToken.name;
          const isAdmin = decodedToken.isAdmin;
          console.log('Usuário autenticado:', userName, 'Admin:', isAdmin); // <-- Verifica usuário logado
          this.setLoggedInUser(userName, isAdmin);
        } catch (error) {
          console.error('Erro ao decodificar o token:', error);
          this.logout();
        }
      }
    }
  }  

  // Método para buscar pratos
  getDishes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dishes`);
  }
}