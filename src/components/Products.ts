import { IProduct } from "../types";
import { Component } from "./base/component";
import { ProductModel } from "./ProductModel";

export class Products extends Component<IProduct[]> {
		products: IProduct[];
		productModel: ProductModel;
	
		constructor(productModel: ProductModel) {
			const mainContainer: HTMLElement = document.querySelector('.gallery');
			super(mainContainer);
			this.productModel = productModel;
			this.products = this.productModel.getProducts();
			console.log(this.products);
		}

	renderProductsList():void {

  }
	
}