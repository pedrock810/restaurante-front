import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
    });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.userService.getUsers().subscribe((users) => {
        const user = users.find((u: any) => u.id === this.userId);
        if (user) {
          this.userForm.patchValue(user);
        }
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid && this.userId) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        () => this.router.navigate(['/admin/users']),
        (error) => console.error('Erro ao atualizar usuário:', error)
      );
    }
  }
}
