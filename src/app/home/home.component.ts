import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { CategoryService } from '../services/category.service';
import { DishService } from '../services/dish.service'; // Importe o DishService
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recommendedDishes: any[] = [];
  categories: any[] = [];
  dishes: any[] = []; // Array para armazenar todos os pratos

  constructor(
    private categoryService: CategoryService,
    private dishService: DishService, // Injete o DishService
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadRecommendedDishes();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        // Após carregar as categorias, carregue os pratos
        this.loadDishes();
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

  loadDishes(): void {
    this.dishService.getDishes().subscribe(
      (dishes) => {
        this.dishes = dishes;
        // Associe os pratos às categorias
        this.associateDishesToCategories();
      },
      (error) => {
        console.error('Erro ao carregar pratos:', error);
      }
    );
  }

  associateDishesToCategories(): void {
    this.categories.forEach((category) => {
      // Filtra os pratos que pertencem à categoria atual
      category.dishes = this.dishes.filter((dish) => dish.categoryId === category.id);
    });
  }

  loadRecommendedDishes(): void {
    this.authService.getDishes().subscribe(
      (dishes) => {
        if (dishes.length > 0) {
          const shuffledDishes = this.shuffleArray(dishes);
          this.recommendedDishes = shuffledDishes.slice(0, 5);
        }
      },
      (error) => {
        console.error('Erro ao carregar pratos:', error);
      }
    );
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}