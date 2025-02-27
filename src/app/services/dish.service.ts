import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private apiUrl = 'https://restaurante-webapp-back.vercel.app/api/dishes';

  constructor(private http: HttpClient) {}

  // Método para listar todos os pratos
  getDishes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Método para criar um novo prato
  createDish(dish: { name: string; description: string; price: number; photo: string; categoryId: string }): Observable<any> {
    const token = localStorage.getItem('token'); // Pegando o token armazenado
    if (!token) {
      console.error('Token não encontrado!');
      return new Observable(observer => {
        observer.error({ error: 'Usuário não autenticado' });
      });
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.apiUrl, dish, { headers });
  }

  // Método para atualizar um prato
  updateDish(id: string, dish: { name: string; description: string; price: number; photo: string; categoryId: string }): Observable<any> {
    const token = localStorage.getItem('token'); // Pegando o token armazenado
    if (!token) {
      console.error('Token não encontrado!');
      return new Observable(observer => {
        observer.error({ error: 'Usuário não autenticado' });
      });
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.apiUrl}/${id}`, dish, { headers });
  }

  // Método para deletar um prato
  deleteDish(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}