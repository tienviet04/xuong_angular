import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../../types/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiUrl = 'http://localhost:3000/categories';
  http = inject(HttpClient);

  constructor() {}

  getAllCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
