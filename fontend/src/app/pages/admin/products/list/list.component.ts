import { Component, inject } from '@angular/core';
import { Product } from '../../../../../types/Product';
import { ProductService } from '../../../../services/product.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, MessagesModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ProductListComponent {
  products: Product[] = [];
  productService = inject(ProductService);
  messages: Message[] = [];
  errorMessage: string = '';
  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }

  handleDeleteProduct(id: string) {
    if (window.confirm('Xoa that nhe')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter((product) => product._id !== id);
          this.messages = [
            {
              severity: 'success',
              summary: 'Thành công',
              detail: 'Xoá thành công',
            },
          ];
          setTimeout(() => (this.messages = []), 2000);
        },
        error: (error) => {
          console.error(error.message);
          this.messages = [
            {
              severity: 'error',
              summary: 'Lỗi',
              detail: 'Xoá không thành công',
            },
          ];
          setTimeout(() => (this.messages = []), 1500);
        },
      });
    }
  }
}
