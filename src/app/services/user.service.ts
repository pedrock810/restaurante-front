import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://restaurante-webapp-back.vercel.app/api/users';

  constructor(private http: HttpClient) {}

  // Método para obter o token do LocalStorage
  private getAuthHeaders() {
    const token = localStorage.getItem('token'); // Pegando o token armazenado
    if (!token) {
      console.error('Token não encontrado!');
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Envia o token no cabeçalho
    });
  }

  // Método para listar todos os usuários
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  // Método para obter o usuário específico
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  // Método para atualizar um usuário
  updateUser(id: string, user: { name: string; email: string; password?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user, {
      headers: this.getAuthHeaders(),
    });
  }

  // Método para deletar um usuário
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}
