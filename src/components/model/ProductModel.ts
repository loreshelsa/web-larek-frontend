import { IProduct } from '../../types';

export class ProductModel {
  
	protected items: IProduct[] = [];

  setProducts(items: IProduct[]){
    this.items = items;
  }

  getProducts():IProduct[] {
    return this.items;
  }
}