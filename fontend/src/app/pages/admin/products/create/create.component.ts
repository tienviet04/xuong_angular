import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProductService } from '../../../../services/product.service';
import { Category } from '../../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, ToastModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [MessageService],
})
export class ProductCreateComponent {
  //https://v17.angular.io/api/forms/Validators
  categories: Category[] = [];
  productService = inject(ProductService);
  router = inject(Router);
  messageService = inject(MessageService);
  categoryService = inject(CategoryService);

  addProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(true),
    startAt: new FormControl(''),
    bidTime: new FormControl(''),
    bidPriceMax: new FormControl(0),
  });

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Disconnect Database',
        });
        console.error(error.message);
      },
    });
  }

  handleCreateProduct() {
    console.log(this.addProductForm.value);
    this.productService
      .createProduct({ ...this.addProductForm.value, endAt: new Date() })
      .subscribe({
        next: () => {
          console.log('aa');
          this.messageService.add({
            severity: 'success',
            summary: 'Create Product',
            detail: 'Thanh Cong',
          });
          setTimeout(() => this.router.navigate(['/admin/list']), 1000);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Create Product',
            detail: 'Error',
          });
          console.error(error.message);
        },
      });
  }
}
