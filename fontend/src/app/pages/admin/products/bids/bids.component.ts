import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { BidService } from '../../../../services/bid.service';
import { Product } from '../../../../../types/Product';
import { DatePipe, NgFor } from '@angular/common';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-bids',
  standalone: true,
  imports: [NgFor, MessagesModule, DatePipe],
  templateUrl: './bids.component.html',
  styleUrl: './bids.component.css',
})
export class BidsComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  bidService = inject(BidService);
  messages: Message[] = [];
  product!: Product;

  productId!: string;

  getProductDetail(id: string) {
    this.productService.getProductDetail(id).subscribe({
      next: (data) => {
        this.product = data;
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
  handleSetBidWin(id: string) {
    this.bidService.updateBid(id, true).subscribe({
      next: (data) => {
        alert('OK')
        this.getProductDetail(this.productId);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
