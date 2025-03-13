import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DishService } from '../services/dish.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./dish-detail.component.css'],
})
export class DishDetailComponent implements OnInit {
  dish: any = null; // Armazena os detalhes do prato
  categoryDishes: any[] = []; // Armazena outros pratos da mesma categoria

  constructor(
    private route: ActivatedRoute,
    private dishService: DishService
  ) {}

  ngOnInit(): void {
    // Observa mudanças nos parâmetros da rota
    this.route.paramMap.subscribe((params) => {
      const dishId = params.get('id'); // Obtém o ID do prato da rota
      if (dishId) {
        this.loadDishDetails(dishId);
      }
    });
  }

  loadDishDetails(dishId: string): void {
    this.dishService.getDishById(dishId).subscribe(
      (dish) => {
        this.dish = dish;
        this.loadDishesFromCategory(dish.categoryId); // Carrega pratos da mesma categoria
      },
      (error) => {
        console.error('Erro ao carregar detalhes do prato:', error);
      }
    );
  }

  loadDishesFromCategory(categoryId: string): void {
    this.dishService.getDishes().subscribe(
      (dishes: any[]) => { // Defina o tipo do parâmetro dishes
        this.categoryDishes = dishes.filter(
          (dish: any) => dish.categoryId === categoryId && dish.id !== this.dish.id // Defina o tipo do parâmetro dish
        );
      },
      (error) => {
        console.error('Erro ao carregar pratos da categoria:', error);
      }
    );
  }

  addToCart(): void {
    if (this.dish) {
      // Lógica para adicionar o prato ao carrinho
      console.log('Prato adicionado ao carrinho:', this.dish);
      alert(`${this.dish.name} foi adicionado ao carrinho!`);
    }
  }
}