import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://restaurante-webapp-back.vercel.app/api/categories';

  constructor(private http: HttpClient) {}

  // Método para listar todas as categorias
  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createCategory(category: { name: string; description?: string }): Observable<any> {
    const token = localStorage.getItem('token'); // Pegando o token do localStorage
    if (!token) {
      console.error('Token não encontrado!');
      return new Observable(observer => {
        observer.error({ error: 'Usuário não autenticado' });
      });
    }
  
    return this.http.post(this.apiUrl, category, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // Método para atualizar uma categoria
  updateCategory(id: string, category: { name: string; description?: string }): Observable<any> {
    const token = localStorage.getItem('token'); // Pegando o token armazenado
    if (!token) {
      console.error('Token não encontrado!');
      return new Observable(observer => {
        observer.error({ error: 'Usuário não autenticado' });
      });
    }
  
    return this.http.put(`${this.apiUrl}/${id}`, category, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }  

  // Método para deletar uma categoria
  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}