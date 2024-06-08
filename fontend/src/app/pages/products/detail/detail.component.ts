import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../types/Product';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BidService } from '../../../services/bid.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, CountdownComponent, NgIf, NgFor],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  bidService = inject(BidService);

  product!: Product | undefined;
  config: CountdownConfig = {
    leftTime: 0,
  };

  // bidPriceMax: number = 0;

  bidForm: FormGroup = new FormGroup({
    price: new FormControl('', [Validators.min(1)]),
    bidPriceMax: new FormControl(1),
  });
  productId!: string;

  getProductDetail(id: string) {
    this.productService.getProductDetail(id).subscribe({
      next: (data) => {
        this.product = data;
        const stepTimeBid = Math.floor(
          (new Date(data.endAt).getTime() - new Date().getTime()) / 1000
        );
        this.config = {
          leftTime: stepTimeBid,
        };
        // const maxPrice = Math.max(...data.bids.map((bid) => bid.price));
        // this.bidPriceMax = maxPrice;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.getProductDetail(this.productId);
    });
  }

  handleSubmit() {
    if (!this.product) return;
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.bidService
      .createBid({
        product: this.product._id,
        bids: this.product.bids.map((bid) => bid._id),
        user: userId,
        price: this.bidForm.value.price,
        bidPriceMax: this.product.bidPriceMax,
      })
      .subscribe({
        next: (data) => {
          this.getProductDetail(this.productId);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
  }
}
