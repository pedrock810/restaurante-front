import { Injectable } from '@angular/core';
import { CategoryService } from './category.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, switchMap  } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DishService {
  private apiUrl = 'https://restaurante-webapp-back.vercel.app/api/dishes';

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  // Método para listar todos os pratos
  getDishes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getDishById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      switchMap((dish: any) => {
        // Busca o nome da categoria com base no categoryId
        return this.categoryService.getCategoryById(dish.categoryId).pipe(
          map((category: any) => {
            dish.categoryName = category.name; // Adiciona o nome da categoria ao prato
            return dish;
          })
        );
      })
    );
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