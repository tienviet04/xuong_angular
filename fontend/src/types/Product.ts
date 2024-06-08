import { Bid } from './Bid';

export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: {
    _id: string;
    name: string;
    description: string;
  };
  image: string;
  isShow: boolean;
  bids: Bid[];
  startAt: Date;
  endAt: Date;
  bidPriceMax: number;
};

export type ProductForm = {
  title: string;
  price: number;
  description: string;
  category: {
    _id: string;
    name: string;
    description: string;
  };
  image: string;
  isShow: boolean;
};
