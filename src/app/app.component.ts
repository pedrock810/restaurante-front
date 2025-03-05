import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loggedInUser: { name: string; isAdmin: boolean } | null = null;
  categories: any[] = [];
  categoryColumns: any[][] = [];
  showCategories: boolean = false; // Controla a exibição do menu de categorias

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.authService.restoreUserState();
    this.authService.getLoggedInUser().subscribe((user) => {
      this.loggedInUser = user;
    });

    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      (categories) => {
        this.categories = categories;
        this.splitCategoriesIntoColumns();
      },
      (error) => {
        console.error('Erro ao carregar categorias:', error);
      }
    );
  }

  splitCategoriesIntoColumns() {
    const maxCategoriesPerColumn = 5;
    this.categoryColumns = [];
    for (let i = 0; i < this.categories.length; i += maxCategoriesPerColumn) {
      this.categoryColumns.push(this.categories.slice(i, i + maxCategoriesPerColumn));
    }
  }

  toggleCategories() {
    this.showCategories = !this.showCategories; // Alterna a exibição do menu
  }

  filterDishesByCategory(categoryId: number) {
    this.showCategories = false; // Fecha o menu após selecionar uma categoria
    this.router.navigate(['/home'], { queryParams: { category: categoryId } });
  }

  openLoginDialog() {
    this.dialog.open(LoginComponent, {
      width: '300px',
    });
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    this.authService.logout();
  }

  goToAdminPanel() {
    this.router.navigate(['/admin']);
  }
}