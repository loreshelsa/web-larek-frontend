import { Api } from './base/api';
import { IProductResponse } from '../types';
import { ProductModel } from './ProductModel';
import { ApiProduct } from './ApiProduct';
// import { Products } from './Products';
import { EventEmitter } from './base/events';
import { API_URL } from '../utils/constants';

export class App {
	api: Api;
	apiProduct: ApiProduct;
	// galleryProducts: Products;

	constructor(protected events: EventEmitter, protected productModel: ProductModel) {
		this.api = new Api(API_URL);
		this.apiProduct = new ApiProduct(this.api);
		this.apiProduct.getProducts().then((res: IProductResponse) => {
			this.productModel.setProducts(res.items);
			events.emit('products:changed');
			// this.galleryProducts = new Products(this.productModel);
		});
	}

	render() {}
}
