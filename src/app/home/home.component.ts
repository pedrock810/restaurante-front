import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { AuthService } from '../auth.service';
import { CategoryService } from '../services/category.service';
import { DishService } from '../services/dish.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recommendedDishes: any[] = [];
  categories: any[] = []; 
  dishes: any[] = [];
  filteredDishes: any[] = [];
  isFiltered: boolean = false; // Estado para controlar se está filtrado ou não

  //Parte das Imagens
  carouselImages = [
    { url: 'https://cdn.alfabetajuega.com/alfabetajuega/2021/07/Por-que-nos-gusto-tanto-el-ending-de-Jujutsu-Kaisen.jpg', alt: 'Imagem 1', caption: 'Bem-Vindo ao (tem nome ainda não)' },
    { url: 'https://pbs.twimg.com/media/EzntjrfXoAErtZd?format=jpg&name=large', alt: 'Imagem 2', caption: 'Bem-Vindo ao (tem nome ainda não)' },
    { url: 'https://pbs.twimg.com/media/EoGxdOGVkAEKW4O?format=jpg&name=large', alt: 'Imagem 3', caption: 'Bem-Vindo ao (tem nome ainda não)' },
    { url: 'https://external-preview.redd.it/0HesVMV96-WevES9ly-TmFk31_acj9eCmIMZ6BGqewU.png?width=1080&crop=smart&format=pjpg&auto=webp&s=85d468d81769efb5239f11903c82c90ac878b416', alt: 'Imagem 4', caption: 'Bem-Vindo ao (tem nome ainda não)' },
    { url: 'https://i.ytimg.com/vi/t5l1rlPLXaE/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHUBoAC4AOKAgwIABABGHIgTyhFMA8=&rs=AOn4CLBXck1rrTw3pEInLh9kspLANWtRww', alt: 'Imagem 5', caption: 'Bem-Vindo ao (tem nome ainda não)' },
    { url: 'https://s2.dmcdn.net/v/SurCp1XART823Te8b/x1080', alt: 'Imagem 6', caption: 'Bem-Vindo ao (tem nome ainda não)' },
    { url: 'https://pbs.twimg.com/media/Ej5vvwEXkAYDBU6.jpg', alt: 'Imagem 7', caption: 'Bem-Vindo ao (tem nome ainda não)' },
  ];

  currentImageIndex = 0;
  private intervalId: any;

  ngOnDestroy() {
    this.stopCarousel();
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.nextImage();
    }, 5000); // Muda a imagem a cada 3 segundos (ajuste o tempo conforme necessário)
  }

  stopCarousel() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.carouselImages.length;
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }
  //Fim parte das Imagens

  constructor(
    private categoryService: CategoryService,
    private dishService: DishService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.startCarousel();
    this.loadCategories();
    this.loadRecommendedDishes();

    // Verifica se há um filtro de categoria na URL
    this.route.queryParams.subscribe((params) => {
      const categoryId = params['category'];
      if (categoryId) {
        this.isFiltered = true;
        this.filterDishesByCategory(categoryId);
      } else {
        this.isFiltered = false;
        this.filteredDishes = this.dishes;
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
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
        this.filteredDishes = dishes;
        this.associateDishesToCategories();
      },
      (error) => {
        console.error('Erro ao carregar pratos:', error);
      }
    );
  }

  associateDishesToCategories(): void {
    this.categories.forEach((category) => {
      category.dishes = this.dishes.filter((dish) => dish.categoryId === category.id);
    });
  }

  filterDishesByCategory(categoryId: number): void {
    this.filteredDishes = this.dishes.filter((dish) => dish.categoryId === categoryId);
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

  // Método para limpar o filtro e voltar à visualização inicial
  clearFilter(): void {
    this.isFiltered = false;
    this.filteredDishes = this.dishes;
    this.router.navigate(['/home']); // Remove o parâmetro de categoria da URL
  }
}
