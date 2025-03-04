import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';  // Para pegar o ID do usuário da URL
import { CommonModule } from '@angular/common'; // ✅ Importar o CommonModule
import { RouterModule } from '@angular/router'; // ✅ Importar o RouterModule

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  currentUser: any = {};  // Variável para armazenar os dados do usuário que será editado
  isEditing: boolean = false;  // Controle para saber se estamos editando ou não

  constructor(
    private userService: UserService,
    private route: ActivatedRoute  // Para pegar o ID da URL
  ) {}

  ngOnInit() {
    this.loadUsers();
    const userId = this.route.snapshot.paramMap.get('id'); // Pega o ID da URL
    if (userId) {
      this.loadUserById(userId);  // Carrega as informações do usuário para edição
    }
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }

  loadUserById(id: string) {
    this.userService.getUserById(id).subscribe(
      (user) => {
        this.currentUser = user;
        this.isEditing = true;  // Define que estamos em modo de edição
      },
      (error) => {
        console.error('Erro ao carregar usuário:', error);
      }
    );
  }

  // Método para atualizar o usuário
  updateUser() {
    this.userService.updateUser(this.currentUser.id, this.currentUser).subscribe(
      (response) => {
        console.log('Usuário atualizado:', response);
        this.loadUsers();  // Recarrega a lista de usuários
        this.isEditing = false;  // Desabilita o modo de edição
      },
      (error) => {
        console.error('Erro ao atualizar usuário:', error);
      }
    );
  }

  // Método para deletar um usuário
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(
      () => this.loadUsers(),
      (error) => console.error('Erro ao deletar usuário:', error)
    );
  }
}
