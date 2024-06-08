import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../types/User';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  searchTerm: string = '';
  user: User | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  search(keyword: string): void {
    const currentUrl = this.router.url;
    let searchUrl = '/search';

    if (currentUrl.includes('/admin')) {
      searchUrl = '/admin/search';
    }

    console.log('Keyword:', keyword);
    this.router.navigateByUrl(`${searchUrl}?q=${keyword}`);
  }
  ngOnInit() {
    this.authService.getUserData().subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
  }
  logout(): void {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }
}
