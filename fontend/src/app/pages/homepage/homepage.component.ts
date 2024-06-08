import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../types/Product';
import { ApiResponse, ProductService } from '../../services/product.service';
import { Message } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  pagedProducts: Product[] = [];
  productService = inject(ProductService);
  messages: Message[] = [];
  errorMessage: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
        this.totalPages = Math.ceil(
          this.filteredProducts.length / this.itemsPerPage
        );
        this.updatePagedProducts();
      },
      error: (error) => {
        console.error('Error loading products:', error.message);
      },
    });
  }

  searchProducts(): void {
    this.productService.searchProduct(this.searchTerm).subscribe(
      (response: ApiResponse) => {
        this.products = response.data;
        this.filteredProducts = this.products;
        this.totalPages = response.pagination
          ? response.pagination.totalPages
          : 0;
        this.updatePagedProducts();
      },
      (error) => {
        console.error('Error searching products:', error);
        this.errorMessage = 'An error occurred while searching for products.';
      }
    );
  }

  updatePagedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1) {
      page = 1;
    } else if (page > this.totalPages) {
      page = this.totalPages;
    }
    this.currentPage = page;
    this.updatePagedProducts();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
