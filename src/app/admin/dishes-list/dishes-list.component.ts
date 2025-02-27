import { Component, OnInit } from '@angular/core';
import { DishService } from '../../services/dish.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dishes-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.css'],
})
export class DishesListComponent implements OnInit {
  dishes: any[] = [];

  constructor(private dishService: DishService) {}

  ngOnInit() {
    this.loadDishes();
  }

  loadDishes() {
    this.dishService.getDishes().subscribe(
      (data: any) => {
        this.dishes = data;
      },
      (error) => {
        console.error('Erro ao carregar pratos:', error);
      }
    );
  }

  deleteDish(id: string) {
    this.dishService.deleteDish(id).subscribe(
      () => {
        this.loadDishes(); // Recarrega a lista após a exclusão
      },
      (error) => {
        console.error('Erro ao deletar prato:', error);
      }
    );
  }
}