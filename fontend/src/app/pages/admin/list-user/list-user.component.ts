import { Component, OnInit, inject } from '@angular/core';
import { Message } from 'primeng/api';
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../../types/User'; // Thêm import cho User từ đường dẫn phù hợp
import { MessagesModule } from 'primeng/messages';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-list-user',
  standalone: true,
  imports: [MessagesModule, NgIf, NgFor],
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
})
export class ListUserComponent implements OnInit {
  users: User[] = [];
  messages: Message[] = [];
  authService = inject(AuthService);
  errorMessage: string = '';

  ngOnInit() {
    this.authService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  handleDeleteUser(id: string) {
    if (window.confirm('Bạn có thực sự muốn xoá!')) {
      this.authService.deleteUser(id).subscribe({
        next: () => {
          this.users = this.users.filter((user) => user._id !== id);
          this.messages = [
            {
              severity: 'success',
              summary: 'Thành công',
              detail: 'Xóa thành công',
            },
          ];
        },
        error: (error) => {
          console.error(error.message);
          this.messages = [
            {
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Xóa không thành công',
            },
          ];
        },
      });
    }
  }
}
