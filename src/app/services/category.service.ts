import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://restaurante-webapp-back.vercel.app/api/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getDishesByCategory(categoryId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${categoryId}/dishes`);
  }

  createCategory(category: { name: string; description?: string }): Observable<any> {
    const token = localStorage.getItem('token');
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

  updateCategory(id: string, category: { name: string; description?: string }): Observable<any> {
    const token = localStorage.getItem('token');
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

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}