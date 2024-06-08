import { MessagesModule } from 'primeng/messages';
import { Component, inject } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../../../../types/Category';
import { CategoryService } from '../../../../services/category.service';
import { Message } from 'primeng/api';
import { NgFor, NgIf } from '@angular/common';
import { Product } from '../../../../../types/Product';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, MessagesModule, NgFor],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class ProductEditComponent {
  categories: Category[] = [];
  categoryService = inject(CategoryService);
  productService = inject(ProductService);
  route = inject(ActivatedRoute);
  productId!: string;
  router = inject(Router);
  messages: Message[] = [];
  errorMessage: string = '';
  product: Product | null = null;

  addProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    isShow: new FormControl(true),
    bidTime: new FormControl(''),
    startAt: new FormControl(''),
  });

  ngOnInit() {
    // const id: string = this.route.snapshot.params[id
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.productService.getProductDetail(param['id']).subscribe({
        next: (data) => {
          const now = new Date(data.startAt);
          now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
          const startAt = now.toISOString().slice(0, 16);
          this.addProductForm.patchValue({ ...data, startAt: startAt });
          this.product = data;
        },
        error: (error) => {
          // show thong bao error
          console.error(error);
        },
      });
    });
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
  }

  handleUpdateProduct() {
    this.productService
      .editProduct(this.productId, this.addProductForm.value)
      .subscribe({
        next: () => {
          this.messages = [
            {
              severity: 'success',
              summary: 'Thành công',
              detail: 'Update Done',
            },
          ];
          setTimeout(() => {
            this.router.navigate(['/admin/list']);
          }, 2000);
        },
        error: (error) => {
          this.messages = [
            {
              severity: 'error',
              summary: 'Error',
              detail: 'Update error',
            },
          ];
          console.error(error.message);
        },
      });
  }
}
