import { Api } from './base/api';
import { IProductResponse } from '../types';
import { ProductModel } from './model/ProductModel';
import { ApiProduct } from './Api/ApiProduct';
import { EventEmitter } from './base/events';
import { API_URL, settings } from '../utils/constants';

export class App {
	api: Api;
	apiProduct: ApiProduct;

	constructor(protected events: EventEmitter, protected productModel: ProductModel) {
		this.api = new Api(API_URL);
		this.apiProduct = new ApiProduct(this.api);
		this.apiProduct.getProducts().then((res: IProductResponse) => {
			this.productModel.setProducts(res.items);
			events.emit(settings.events.productsChanged);
		});
	}
	
}
