import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm, User } from '../../types/User';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(data: RegisterForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: LoginForm): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUserData(): Observable<User | null> {
    const data = localStorage.getItem('user');
    const user = data ? JSON.parse(data) : null;
    return of(user); // Return an observable
  }

  deleteUser(userId: string): Observable<User> {
    const url = `${this.apiUrl}/${userId}`; // API URL for deleting user
    return this.http.delete<User>(url);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
