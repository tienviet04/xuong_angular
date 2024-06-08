import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuadService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserData().pipe(
      map((user) => {
        if (user && user.role === 'admin') {
          return true;
        } else {
          alert('bạn không có quyền truy cập admin');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
