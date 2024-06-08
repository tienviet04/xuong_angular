import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { RegisterForm, User } from '../../../types/User';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MessagesModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  messages: Message[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // Inject Router
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
      const registerFormValue: RegisterForm = {
        username: name,
        email,
        password,
      };
      this.authService.register(registerFormValue).subscribe(
        (response) => {
          this.messages = [
            {
              severity: 'success',
              summary: 'Thành công',
              detail: 'Đăng ký thành công',
            },
          ];
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        (error) => {
          console.error('Registration failed', error);
          this.messages = [
            {
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Gmail đã có người đăng ký',
            },
          ];
          setTimeout(() => {
            this.messages = [];
          }, 2000);
        }
      );
    }
  }
}
