import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component'; // Importe o AdminPanelComponent
import { DishesListComponent } from './admin/dishes-list/dishes-list.component';
import { DishFormComponent } from './admin/dish-form/dish-form.component';
import { CategoriesListComponent } from './admin/categories-list/categories-list.component';
import { CategoryFormComponent } from './admin/category-form/category-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona para a página inicial
  { path: 'home', component: HomeComponent }, // Rota para a página inicial
  { path: 'admin', component: AdminPanelComponent, children: [
    { path: 'dishes', component: DishesListComponent }, // Rota para listar pratos
    { path: 'dishes/new', component: DishFormComponent }, // Rota para criar um novo prato
    { path: 'dishes/edit/:id', component: DishFormComponent }, // Rota para editar um prato
    { path: 'categories', component: CategoriesListComponent }, // Rota para listar categorias
    { path: 'categories/new', component: CategoryFormComponent }, // Rota para criar uma nova categoria
    { path: 'categories/edit/:id', component: CategoryFormComponent }, // Rota para editar uma categoria
  ]},
];  