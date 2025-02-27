import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http'; // Importe o HttpClientModule

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recommendedDishes: any[] = []; // Array para armazenar os pratos recomendados

  constructor(private authService: AuthService) {} // Injete o AuthService

  ngOnInit(): void {
    this.loadRecommendedDishes();
  }

  // Método para carregar pratos recomendados
  loadRecommendedDishes(): void {
    this.authService.getDishes().subscribe(
      (dishes) => {
        if (dishes.length > 0) {
          // Randomiza a lista de pratos
          const shuffledDishes = this.shuffleArray(dishes);
          // Seleciona no máximo 5 pratos
          this.recommendedDishes = shuffledDishes.slice(0, 5);
        }
      },
      (error) => {
        console.error('Erro ao carregar pratos:', error);
      }
    );
  }

  // Método para randomizar um array
  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}