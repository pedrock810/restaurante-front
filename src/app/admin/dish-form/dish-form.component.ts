import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DishService } from '../../services/dish.service';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dish-form',
  imports:[CommonModule, ReactiveFormsModule ],
  templateUrl: './dish-form.component.html',
  styleUrls: ['./dish-form.component.css'],
})
export class DishFormComponent implements OnInit {
  dishForm: FormGroup;
  categories: any[] = [];
  isEditMode = false;
  dishId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      photo: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.dishId = this.route.snapshot.paramMap.get('id');
    if (this.dishId) {
      this.isEditMode = true;
      this.loadDish(this.dishId);
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

  loadDish(id: string) {
    this.dishService.getDishes().subscribe(
      (data: any) => {
        const dish = data.find((d: any) => d.id === id);
        if (dish) {
          this.dishForm.patchValue(dish);
        }
      },
      (error) => {
        console.error('Erro ao carregar prato:', error);
      }
    );
  }

  onSubmit() {
    if (this.dishForm.valid) {
      const dish = this.dishForm.value;
      if (this.isEditMode && this.dishId) {
        this.dishService.updateDish(this.dishId, dish).subscribe(
          () => {
            this.router.navigate(['/admin/dishes']);
          },
          (error) => {
            console.error('Erro ao atualizar prato:', error);
          }
        );
      } else {
        this.dishService.createDish(dish).subscribe(
          () => {
            this.router.navigate(['/admin/dishes']);
          },
          (error) => {
            console.error('Erro ao criar prato:', error);
          }
        );
      }
    }
  }
}