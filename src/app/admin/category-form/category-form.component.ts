import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-form',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  isEditMode = false;
  categoryId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.isEditMode = true;
      this.loadCategory(this.categoryId);
    }
  }

  loadCategory(id: string) {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        const category = data.find((c: any) => c.id === id);
        if (category) {
          this.categoryForm.patchValue(category);
        }
      },
      (error) => {
        console.error('Erro ao carregar categoria:', error);
      }
    );
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      console.log("Enviando categoria para criação:", category);
      if (this.isEditMode && this.categoryId) {
        this.categoryService.updateCategory(this.categoryId, category).subscribe(
          () => {
            console.log("Categoria atualizada com sucesso!");
            this.router.navigate(['/admin/categories']);
          },
          (error) => {
            console.error('Erro ao atualizar categoria:', error);
          }
        );
      } else {
        this.categoryService.createCategory(category).subscribe(
          () => {
            console.log("Categoria criada com sucesso!");
            this.router.navigate(['/admin/categories']);
          },
          (error) => {
            console.error('Erro ao criar categoria:', error);
          }
        );
      }
    }
  }
}