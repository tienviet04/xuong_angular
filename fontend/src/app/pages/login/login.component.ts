import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserLoginRes } from '../../../types/User';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, MessagesModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  messages: Message[] = [];
  errorMessage: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  handleSubmit() {
    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        localStorage.setItem('token', (data as UserLoginRes).token);
        localStorage.setItem('userId', (data as UserLoginRes).user._id);
        localStorage.setItem(
          'user',
          JSON.stringify((data as UserLoginRes).user)
        );
        console.log('User:', (data as UserLoginRes).user);

        this.messages = [
          {
            severity: 'success',
            summary: 'Thành công',
            detail: 'Đăng nhập thành công',
          },
        ];
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.messages = [
          {
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Sai tài khoản mật khẩu',
          },
        ];
        setTimeout(() => {
          this.messages = [];
        }, 2000);
      },
    });
  }
}
